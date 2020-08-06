const User = require('./user')
const Product = require('./product')
const Cart = require('./cart')

// model associations
User.hasMany(Cart)
Product.belongsToMany(Cart, {through: 'CartProduct'})
Cart.belongsToMany(Product, {through: 'CartProduct'})

module.exports = {
  User,
  Product,
  Cart,
}
