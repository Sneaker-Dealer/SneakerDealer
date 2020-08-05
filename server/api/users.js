const router = require('express').Router()
const {User, Cart} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'name', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    // giving back appropriate info -> even the user themselves don't need the password or salt given back to them
    const users = await User.findByPk(req.params.userId, {
      include: [Cart]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
