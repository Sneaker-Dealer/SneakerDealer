const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

// pulls all sneakers
router.get('/', async (req, res, next) => {
  try {
    const sneakers = await Product.findAll()
    res.json(sneakers)
  } catch (err) {
    next(err)
  }
})
