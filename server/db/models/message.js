const Sequelize = require("sequelize");
const db = require("../db");
const { messageStatus } = require("./choices");

const Message = db.define("message", {
  text: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  senderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    default: messageStatus.SENT,
  }
});

module.exports = Message;
