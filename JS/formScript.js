document.addEventListener("DOMContentLoaded", function () {
  // 1. Getting user data
  const activeUserRaw = localStorage.getItem("currentUser");
  const hiddenInput = document.getElementById("username_hidden");
  const emailInput = document.getElementById("email");
  const headerTitle = document.querySelector(".textBox h2");

  if (activeUserRaw) {
    try {
      const userData = JSON.parse(activeUserRaw);
      let username = "Gast";
      let userEmail = "";

      // Testing: is it an array?
      if (Array.isArray(userData) && userData.length > 0) {
        username = userData[0].username || userData[0].email;
        userEmail = userData[0].email;
      }
      // or a single object?
      else if (userData && typeof userData === "object") {
        username = userData.username || userData.email;
      }

      // Setting the name if available
      if (username && username !== "undefined") {
        if (hiddenInput) hiddenInput.value = username;
        if (headerTitle) headerTitle.innerText = "Registration for " + username;
      }

      // Setting the email if available
      if (userEmail && emailInput) {
        emailInput.value = userEmail;
        // Optionally make it read-only
        emailInput.readOnly = true;
        emailInput.style.backgroundColor = "#e9e9e9";
      }
    } catch (e) {
      console.error("Error while loading data:", e);
    }
  }

  // 2. Formular-Submit Event
  const surveyForm = document.getElementById("userForm");
  if (surveyForm) {
    surveyForm.addEventListener("submit", function (e) {
      // Stops the reloading of the page
      e.preventDefault();

      try {
        const formData = new FormData(this);
        const data = {};

        formData.forEach((value, key) => {
          data[key] = value;
        });

        // add timestamp
        data.timestamp = new Date().toISOString();

        // Create JSON string
        const jsonData = JSON.stringify(data);

        // create unique key
        const userRef = data.submittedBy || "Gast";
        const storageKey = `survey_${userRef}_${Date.now()}`;

        // SAVE to LocalStorage
        localStorage.setItem(storageKey, jsonData);

        // Show success message
        const successMsg = document.getElementById("successMessage");
        if (successMsg) {
          successMsg.style.display = "block";
          successMsg.innerText = "Data saved for " + userRef + "!";
        }

        // Optionally reset the form
        this.reset();

        console.log("Saved:", storageKey, data);
      } catch (error) {
        console.error("Error while saving:", error);
        alert("Error while saving the data!");
      }
    });
  }
});
