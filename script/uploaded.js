    // Initialize Firebase
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

    // Function to fetch uploaded files
    function fetchUploadedFiles() {
      const fileList = document.getElementById('fileList');
      fileList.innerHTML = ''; // Clear previous content

      db.collection("uploadedFiles").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          // Assuming each document has a 'fileName' and 'fileURL' field
          const fileLink = document.createElement('a');
          fileLink.href = data.fileURL;
          fileLink.textContent = data.fileName;
          fileList.appendChild(fileLink);
          fileList.appendChild(document.createElement('br'));
        });
      });
    }

    // Event listener for 'Uploaded Design' link
    document.querySelector('#uploadOptions a[href="#"]').addEventListener('click', function(event) {
      event.preventDefault();
      fetchUploadedFiles();
    });