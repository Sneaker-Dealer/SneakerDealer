const Sequelize = require('sequelize')
const db = require('../db')

const ProductCart = db.define('Product_Cart', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: '1',
    allowNull: false,
  },
})

// const ProductCart = db.define('Product_Cart', {}, {
//     quantity: {
//         type: Sequelize.INTEGER,
//         defaultValue: '1',
//         allowNull: false,
//     }
// }
// )

module.exports = ProductCart
