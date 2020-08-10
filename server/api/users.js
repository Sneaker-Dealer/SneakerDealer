const router = require('express').Router()
const {User, Cart, Product} = require('../db/models')
const ProductCart = require('../db/models/product_cart')
const {isSelf} = require('./gatekeeper')
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

//Add new user (sign up)
router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    const cart = await Cart.create({status: 'CREATED'})
    user.addCart(cart)
    res.status(201).send(user)
  } catch (error) {
    next(error)
  }
})

router.get('/:userId/cart' , async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {userId: req.params.userId, status: 'CREATED'},
      include: [{model: Product, as: 'products_in_cart'}],
      order: [[{model: Product, as: 'products_in_cart'}, 'name', 'ASC' ]]
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

router.post('/:userId/cart', async (req, res, next) => {
  try {
    const cart = await ProductCart.create({
      cart_id: req.body.cart_id,
      product_id: req.body.product_id,
      quantity: 1,
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

// router.post('/guest/cart', async (req, res, next) => {
//   try {
//     console.log(req.body)
//     const cart = await Cart.create({
//       status: 'PROCESSING',
//       guestcart: req.body.guestcart
//     })
//     res.json(cart)
//   } catch (err) {
//     next(err)
//   }
// })

router.put('/:userId/cart/checkout', async (req, res, next) => {
  try {
    console.log(req.body.cart_id)
    const [, [cart]] = await Cart.update(
      {
        status: 'PROCESSING',
      },
      {
        returning: true,
        where: {id: req.body.cart_id},
      }
    )
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

router.post('/:userId/cart/new', async (req, res, next) => {
  try {
    const cart = await Cart.create({
      status: "CREATED",
    })
    const user = await User.findOne({
      where: {id: req.params.userId},
      attributes: ['id', 'name', 'email'],
    })
    user.addCart(cart)
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
