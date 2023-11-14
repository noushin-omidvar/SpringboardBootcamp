// compose.js
document
  .getElementById("composeForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form data and make AJAX request for composing a message
    const messageData = {
      // Extract form fields
    };

    composeMessage(messageData);
  });

function composeMessage(messageData) {
  // AJAX request implementation
  // Use the provided AJAX function from the previous response
}
