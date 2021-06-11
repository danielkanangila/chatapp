const { Message } = require("../db/models");

/**
 * Validate the update to make sure that id passed in the request have an entry in the database;
 * @param {object} req | express request object
 * @param {object} res | express response object
 * @param {Function} next | express next callback
 * @returns 
 */
const isMessageExists = async (req, res, next) => {
    try {
        
        const message = await Message.findByPk(req.params.pk);
        // if message does not exists return 404
        if (!message) return res.status(404).json("Message not found.");
        // if message, set message instance in the request a
        req.validatedData = message;
    
        return next();
    } catch (error) {
        console.log(error);
        res.status(500).message("An unknown error occurred while trying to fetch message.")
    }
}

module.exports = {
    isMessageExists,
}