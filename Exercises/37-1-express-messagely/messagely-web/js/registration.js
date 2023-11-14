document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form data
    const userData = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      phone: document.getElementById("phone").value,
    };
    console.log(userData);
    // Make AJAX request for registration using Axios
    registerUser(userData);
  });

function registerUser(userData) {
  axios
    .post("http://localhost:3000/auth/register", userData)
    .then((response) => {
      // Handle success or display errors
      console.log("Registration Response:", response.data);
      // Redirect and show a success message
      return render("messageDetailes.html");
    })
    .catch((error) => console.error("Error:", error));
}
