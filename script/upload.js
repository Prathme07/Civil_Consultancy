const firebaseConfig = {
    apiKey: "AIzaSyBafGAYbLH2DPcX6Ln8ZPXV13NOBF-z6Z8",
    authDomain: "my-chat-app-346e0.firebaseapp.com",
    projectId: "my-chat-app-346e0",
    storageBucket: "my-chat-app-346e0.appspot.com",
    messagingSenderId: "851292148653",
    appId: "1:851292148653:web:d14c90475e4f281efb0724",
    measurementId: "G-MW4S7X0FQ5"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

function handleFileUpload(event) {
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = '';

    const files = event.target.files;
    if (files.length === 0) {
        fileList.innerHTML = '<p>No files selected.</p>';
    } else {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const fileInfo = `<p>File name: ${file.name}, File size: ${formatBytes(file.size)}</p>`;
            fileList.innerHTML += fileInfo;
        }
    }
}

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function simulateUpload() {
    document.getElementById("progressContainer").style.display = "block";
    document.getElementById("progressBarFill").style.width = "0%";

    let progress = 0;
    const interval = setInterval(function() {
        if (progress >= 100) {
            clearInterval(interval);
            document.getElementById("uploadMessage").style.display = "block";
        } else {
            progress += 5; 
            document.getElementById("progressBarFill").style.width = progress + "%";
        }
    }, 200); 

    // Save file metadata to Firestore
    const files = document.getElementById('fileInput').files;
    const fileMetadata = [];

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        fileMetadata.push({
            name: file.name,
            size: file.size,
            type: file.type,
            uploadTime: new Date()
        });
    }

    // Add file metadata to Firestore
    db.collection("files").add({
        files: fileMetadata
    })
    .then((docRef) => {
        console.log("File metadata added with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding file metadata: ", error);
    });
}