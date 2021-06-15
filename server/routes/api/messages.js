const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");
const { isAuthenticated } = require("./../auth/middleware");
const { canSaveMessage } = require("./../../permissions");
const events = require("./../../utils/events")

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", isAuthenticated, canSaveMessage, async (req, res, next) => {
  try {
    const senderId = req.user.id;
    const { text, sender, conversationId } = req.body;

    // listen if is new conversation and change sender status to online
    events.on('newconversation', () => {
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    })

    const message = await Message.create({ senderId, text, conversationId });
    return res.json({ message, sender });

  } catch (error) {
    next(error);
  }
});

module.exports = router;
