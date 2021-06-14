const { Op } = require("sequelize");
const { Conversation } = require("./../db/models");
const events = require("./../utils/events");

/**
 * This middleware validate the message body, 
 * and make sure that only one of the conversation owners can send message 
 * in the conversation. Then set conversationId in request.body that will be used to create new message.
 * @param {object} req | express request object
 * @param {object} res | express response object
 * @param {Function} next | express next callback
 * @returns 
 */
const canSaveMessage = async (req, res, next) => {
    const senderId = req.user.id;
    const { conversationId, recipientId } = req.body;
    let conversation;

    if (conversationId) {
        // Find conversation corresponding to the id  and senderId.
        // This block make sure that only conversation owner can send message with this conversationId.
        conversation = await Conversation.findOne({
            where: {
                id: conversationId,
                [Op.and]: [{
                    [Op.or]: [
                        {
                            user1Id: senderId,
                        },
                        {
                            user2Id: senderId,
                        },
                    ]
                }]
            }
        });
        // if no conversation found, should return 401 error
        if (!conversation)
            return res.status(403).json({ error: "User not allowed to send message in this conversation or conversation id not found." });
        // next handler
        return next()
    } else {
        // if we don't have conversation id, find a conversation to make sure it doesn't already exist
        conversation = await Conversation.findConversation(
            senderId,
            recipientId
        );
        // if no result create new conversation
        if (!conversation) {
            // create conversation
            conversation = await Conversation.create({
              user1Id: senderId,
              user2Id: recipientId,
            });
            // emit event to signal that new conversation is started
            events.emit('newconversation')
        }
        req.body.conversationId = conversation.id;
        return next()
    }

}

module.exports = {
    canSaveMessage
}