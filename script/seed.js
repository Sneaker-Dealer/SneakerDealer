'use strict'
const {green, red} = require('chalk')
const faker = require('faker')
const db = require('../server/db')
const {User, Product, Cart} = require('../server/db/models')
const {staticUsers, staticProducts, staticCarts} = require('./seedStaticData')

const randomUsers = Array(10) // number of generated ramdom users, - change upon need
  .fill(undefined)
  .map(() => ({
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    isAdmin: faker.random.boolean(),
    googleId: null,
  }))

const randomProducts = Array(30) // number of generated ramdom products, - change upon need
  .fill(undefined)
  .map(() => ({
    name: faker.commerce.productName(),
    style: faker.commerce.productAdjective(),
    manufacturer: faker.company.companyName(),
    description: faker.lorem.paragraph(),
    price: (+faker.commerce.price()).toFixed(0),
    photos: [
      faker.image.fashion(),
      faker.image.fashion(),
      faker.image.fashion(),
    ],
    inventory: 10,
  }))

const seed = async () => {
  try {
    await db.sync({force: true})
    console.log('db flushed and models synced!')

    // joining static and randomized test data
    const usersToCreate = staticUsers.concat(randomUsers)
    const productsToCreate = staticProducts.concat(randomProducts)
    const cartsToCreate = staticCarts

    // creating records in the database
    const createdUsers = await Promise.all(
      usersToCreate.map((user) => User.create(user))
    )
    const createdProducts = await Promise.all(
      productsToCreate.map((product) => Product.create(product))
    )
    const createdCarts = await Promise.all(
      cartsToCreate.map((cart) => Cart.create(cart))
    )

    const fillCartWithProducts = await Promise.all([
      createdCarts[0].addProducts_in_cart(createdProducts.slice(0, 5)),
      createdCarts[1].addProducts_in_cart(createdProducts.slice(6, 15)),
      createdCarts[2].addProducts_in_cart(createdProducts.slice(9, 20)),
      createdCarts[3].addProducts_in_cart(createdProducts.slice(15, 25)),
    ])

    const assignUserToCart = await Promise.all([
      createdUsers[0].addCart(createdCarts[0]),
      createdUsers[0].addCart(createdCarts[1]),
      createdUsers[1].addCart(createdCarts[2]),
      createdUsers[2].addCart(createdCarts[3]),
      createdUsers[3].addCart(createdCarts[4]),
    ])
    // logging seeding results in records created
    console.log(`seeded ${createdUsers.length} users`)
    console.log(`seeded ${createdProducts.length} products`)
    console.log(`seeded ${createdCarts.length} carts`)
    console.log(
      `seeded ${fillCartWithProducts.length} out of ${createdCarts.length} carts with products`
    )
    console.log(`seeded ${assignUserToCart.length} carts asigned to users`)
  } catch (err) {
    console.log(red(err))
  }
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
    console.log(green('Seeding success!'))
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
