const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  style: {
    // tennis/basketball --> should become an enum
    type: Sequelize.STRING,
    allowNull: false,
  },
  manufacturer: {
    // SZ: making an API call to retrieve all possible manufacturers
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
  price: {
    // what is a problem with changing it to a float? -> javascript handling decimal values
    // ideally kept in pennies
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  photos: {
    // not a common data type that gets used in relational databases
    // Postgres allows this because it is in fact hybrid
    type: Sequelize.ARRAY(Sequelize.STRING),
    // creating a photos table -> you can associate it with a product
    // you can have 1 association -> 1 - 1 where the photo is the main photo that gets viewed
    // everything else is just extras
    validate: {
      isUrl: true, // SZ: Clean this up please!
    },
    defaultValue: ['tbd'],
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

// decrement -- method: database calls that Sequelize
Product.prototype.decrementInventory = function (num) {
  this.inventory = Math.max(this.inventory - num, 0)
}
