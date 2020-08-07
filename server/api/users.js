const router = require('express').Router()
const {User, Cart, Product} = require('../db/models')
const ProductCart = require('../db/models/product_cart')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'name', 'email'],
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/cart', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {userId: req.params.userId, status: 'CREATED'},
      include: [{model: Product, as: 'products_in_cart'}],
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId/cart', async (req, res, next) => {
  try {
    const [, [cart]] = await ProductCart.update(
      {
        quantity: req.body.quantity,
      },
      {
        returning: true,
        where: {cart_id: req.body.cart_id, product_id: req.body.product_id},
      }
    )
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId/cart', async (req, res, next) => {
  try {
    await ProductCart.destroy({
      where: {cart_id: req.body.cart_id, product_id: req.body.product_id},
    })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
