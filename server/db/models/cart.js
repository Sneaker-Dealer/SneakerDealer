const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  status: {
    type: Sequelize.ENUM('CREATED', 'PROCESSING', 'CANCELLED', 'COMPLETED'),
    defaultValue: 'CREATED',
    allowNull: false,
  },
})

module.exports = Cart

//,
// subTotal: {
//   type: Sequelize.INTEGER
// }

// items: {
//   type: Sequelize.ARRAY(Sequelize.JSON),
//   allowNull: false
// }
