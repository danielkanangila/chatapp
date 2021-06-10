const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");
const { isAuthenticated } = require("./../auth/middleware");
const { canSaveMessage } = require("./../../permissions");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", isAuthenticated, canSaveMessage, async (req, res, next) => {
  try {
    const senderId = req.user.id;
    // const conversationId = req.conversationId // This property is set in the request object after validation in canSaveMessage middleware.
    const { text, sender, conversationId } = req.body;

    // if (onlineUsers.includes(sender.id)) {
    //   sender.online = true;
    // }

    const message = await Message.create({ senderId, text, conversationId });
    return res.json({ message, sender });

  } catch (error) {
    next(error);
  }
});

module.exports = router;
