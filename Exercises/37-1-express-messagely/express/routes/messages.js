const Router = require("express").Router;
const Message = require("../models/message");
const { ensureLoggedIn, ensureCorrectUser } = require("../middleware/auth");

const router = new Router();

/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/
router.get("/:id", ensureLoggedIn, async (req, res, next) => {
  try {
    const messageId = req.params.id;
    const { username } = req.user; // Get the username of the currently logged-in user
    // Retrieve the message details using the Message model's get method
    const messageDetails = await Message.get(messageId);
    // Check if the currently logged-in user is either the sender or recipient
    if (
      messageDetails.from_user.username === username ||
      messageDetails.to_user.username === username
    ) {
      return res.json({ message: messageDetails });
    } else {
      // If the user is not authorized to view this message, return a 401 Unauthorized status
      return res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    return next(error);
  }
});

/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/
// POST /messages - Create and send a new message
router.post("/", ensureLoggedIn, async (req, res, next) => {
  try {
    const { to_username, body } = req.body; // Extract 'to_username' and 'body' from the request body
    const from_username = req.user.username; // Get the 'username' of the currently logged-in user

    // Create a new message using the Message model's 'create' method
    const newMessage = await Message.create({
      from_username,
      to_username,
      body,
    });

    return res.status(201).json({ message: newMessage });
  } catch (error) {
    return next(error);
  }
});

/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/
router.post("/:id/read", ensureLoggedIn, async (req, res, next) => {
  try {
    const messageId = req.params.id;
    const { username } = req.user; // Get the username of the currently logged-in user

    // Retrieve the message details using the Message model's get method
    const messageDetails = await Message.get(messageId);

    // Check if the currently logged-in user is the intended recipient
    if (messageDetails.to_user.username === username) {
      // Mark the message as read using the Message model's markRead method
      const readMessage = await Message.markRead(messageId);
      return res.json({ message: readMessage });
    } else {
      // If the user is not authorized to mark the message as read, return a 401 Unauthorized status
      return res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
