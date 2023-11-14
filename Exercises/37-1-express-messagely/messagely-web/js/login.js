// login.js
document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form data and make AJAX request for login
    const userData = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    };

    loginUser(userData);
  });

function loginUser(userData) {
  axios
    .post("http://localhost:3000/auth/login", userData)
    .then((response) => {
      // Handle success or display errors
      console.log("Login Response:", response.data);
      // Redirect and show a success message
      return render("messageDetailes.html");
    })
    .catch((error) => console.error("Error:", error));
}
