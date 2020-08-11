const router = require('express').Router()
const { Cart, Product } = require('../db/models')
const ProductCart = require('../db/models/product_cart')
module.exports = router

router.post('/cart', async (req, res, next) => {
    try {
        const cart = await Cart.create({
            status: 'PROCESSING',
            recipientName: req.body.recipientName,
            confirmationEmail: req.body.confirmationEmail,
            recipientAddress: req.body.recipientAddress, 
            recipientPhone: req.body.recipientPhone, 
            specialInstructions: req.body.specialInstructions
        })
        req.body.guestcart.map(async (item) => {
            await ProductCart.create({product_id: item.id, cart_id: cart.id, quantity: item.Product_Cart.quantity})
        })
        res.json(cart)
    } catch (err) {
        next(err)
    }
})