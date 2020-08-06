const User = require('./user')
const Product = require('./product')
const Cart = require('./cart')
const ProductCart = require('./product_cart')

User.hasMany(Cart)
Product.belongsToMany(Cart, {
  through: ProductCart,
  as: 'cartproducts',
  foreignKey: 'product_id',
})
Cart.belongsToMany(Product, {
  through: ProductCart,
  as: 'products_in_cart',
  foreignKey: 'cart_id',
})

module.exports = {
  User,
  Product,
  Cart,
  ProductCart,
}
