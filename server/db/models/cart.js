const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  status: {
    // a user can have many orders
    type: Sequelize.ENUM('CREATED', 'PROCESSING', 'CANCELLED', 'COMPLETED'),
    defaultValue: 'CREATED',
    allowNull: false
  },
  // exists as the join table
  items: {
    type: Sequelize.ARRAY(Sequelize.JSON),
    /*
    [
      {
        id: 1,
        quantity: 0
      },
      {
        id: 1,
        quantity: 0
      }
    ]
    */
    allowNull: false
  },
  // could be a virtual!
  subTotal: {
    type: Sequelize.INTEGER
  }
})

module.exports = Cart

// SZ: aiming for a connecting table
// Cart <> Product

// Cart.belongsToMany.Product(...)
// Product.belongsToMany.Cart(...)



// a cart for a LOGGED IN USER
/*
- local state -> sends to db?
- save to db upon adding anything to the cart/remove/edit
- after the DB updates with your cart as an order
- you will need a new cart
*/

// a cart for a GUEST
/*
- local state --> put into local storage
- your inventory of your product in the database needs to update
- cart? your frontend
- you need to create a fulfilled order in the database with no userId
*/
