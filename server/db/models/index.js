const User = require('./user')

const Cart = require('./cart')
const Product = require('./product')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

Cart.belongsTo(User)
User.hasMany(Cart)
Product.belongsToMany(Cart, {
  through: 'Product_Cart',
  as: 'cart',
  foreignKey: 'cart_id',
})
Cart.belongsToMany(Product, {
  through: 'Product_Cart',
  as: 'product',
  foreignKey: 'product_id',
})

module.exports = {
  User,
  Product,
  Cart,
}
