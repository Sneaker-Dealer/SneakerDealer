const router = require('express').Router()
const { Cart } = require('../db/models')
module.exports = router

router.post('/cart', async (req, res, next) => {
    try {
        const cart = await Cart.create({
            status: 'PROCESSING',
            guestCart: req.body.guestcart
        })
        res.json(cart)
    } catch (err) {
        next(err)
    }
})