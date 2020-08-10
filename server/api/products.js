const router = require('express').Router()
const {Product} = require('../db/models')
const {isAdmin} = require('./gatekeeper')

module.exports = router

// Get single product
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    res.send(product)
  } catch (error) {
    next(error)
  }
})

// Get all products
router.get('/', async (req, res, next) => {
  try {
    const sneakers = await Product.findAll({order: [['id', 'ASC']]})
    res.json(sneakers)
  } catch (err) {
    next(err)
  }
})

// Create a new product
router.post('/', isAdmin, async (req, res, next) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).send(product)
  } catch (error) {
    next(error)
  }
})

// Delete single product
router.delete('/:id', isAdmin, async (req, res, next) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.id,
      },
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

// Update single product
router.put('/:id', isAdmin, async (req, res, next) => {
  try {
    const result = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    })
    result[1][0] ? res.json(result[1][0]) : res.sendStatus(404)
  } catch (error) {
    next(error)
  }
})
