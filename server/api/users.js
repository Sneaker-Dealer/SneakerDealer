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
    // const users = await User.findByPk(req.params.userId, {
    //   include: [Cart]
    // })
    const cart = await Cart.findOne({
      where: {userId: req.params.userId, status: 'CREATED'},
      // include: [{model: Product, as: 'product'}],
      include: [{model: Product, as: 'products_in_cart'}],
    })
    console.log(cart)
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId/cart', async (req, res, next) => {
  try {
    const users = await User.findByPk(req.params.userId, {
      include: [Cart],
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
