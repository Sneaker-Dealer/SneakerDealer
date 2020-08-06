const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  status: {
    type: Sequelize.ENUM('CREATED', 'PROCESSING', 'CANCELLED', 'COMPLETED'),
    defaultValue: 'CREATED',
    allowNull: false,
  },
  recipientName: {
    type: Sequelize.STRING,
  },
  confirmationEmail: {
    type: Sequelize.STRING,
  },
  recipientAddress: {
    type: Sequelize.STRING,
  },
  recipientPhone: {
    type: Sequelize.STRING,
  },
  specialInstructions: {
    type: Sequelize.STRING,
  },
})

module.exports = Cart
