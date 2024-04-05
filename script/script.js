document.addEventListener("DOMContentLoaded", () => {
    const body = document.querySelector("body"),
          sidebar = body.querySelector(".sidebar"),
          toggle = body.querySelector(".toggle"),
          modeSwitch = body.querySelector(".toggle-switch"),
          modeText = body.querySelector(".mode-text");

    // Function to toggle sidebar
    toggle.addEventListener("click", () => {
        sidebar.classList.toggle("close");
    });

    // Function to toggle dark mode
    modeSwitch.addEventListener("click", () => {
        body.classList.toggle("dark");
        const isDarkMode = body.classList.contains("dark");
        localStorage.setItem("darkMode", isDarkMode);
        updateModeText(isDarkMode);
    });

    // Function to update mode text
    const updateModeText = (isDarkMode) => {
        modeText.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
    };

    // Check local storage for saved mode
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) {
        body.classList.toggle("dark", savedMode === "true");
        updateModeText(savedMode === "true");
    }
});
  function toggleOptions() {
    var options = document.getElementById("uploadOptions");
    options.style.display = options.style.display === "none" ? "block" : "none";
  }


  function redirectToUploadedDesign() {
    window.location.href = 'uploaded_design.html';
  }

  // Event listener for 'Uploaded Design' link
  document.querySelector('#uploadOptions a[href="#"]').addEventListener('click', function(event) {
    event.preventDefault();
    redirectToUploadedDesign();
  });