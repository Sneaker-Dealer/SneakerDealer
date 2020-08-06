const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  style: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  manufacturer: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  photos: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: [
      'https://cdn1.vectorstock.com/i/1000x1000/33/75/shoes-running-pictogram-vector-12083375.jpg',
    ],
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 0,
    },
  },
})

module.exports = Product

Product.prototype.decrementInventory = function (num) {
  this.inventory = Math.max(this.inventory - num, 0)
}
