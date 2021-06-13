const router = require("express").Router();
const { Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");
const { isAuthenticated } = require("./../auth/middleware");
const { canSaveMessage } = require("./../../permissions");
const events = require("./../../utils/events");
const { messageStatus } = require("./../../db/models/choices");
const { isMessageExists } = require("./../../validations");
const sessionStore = require("../../socket/store");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", isAuthenticated, canSaveMessage, async (req, res, next) => {
  try {
    const senderId = req.user.id;
    // const conversationId = req.conversationId // This property is set in the request object after validation in canSaveMessage middleware.
    const { text, sender, recipientId, conversationId } = req.body;

    // listen if is new conversation and change sender status to online
    if (req.isNewConversation) {
      if (sessionStore.isUserOnline(sender.id)) {
        sender.online = true;
      }
    }

    let status = messageStatus.SENT;

    const message = await Message.create({ senderId, text, conversationId, status });
    return res.json({ message, sender });

  } catch (error) {
    next(error);
  }
});

router.put("/:pk", isAuthenticated, canSaveMessage, isMessageExists, async(req, res, next) => {
  try {
    const instance = req.validatedData;
    const { recipientId, sender, ...data } = req.body;
  
    const updated = await instance.update(data);
  
    res.json(updated);
  } catch (error) {
    next(error)
  }  
})

module.exports = router;