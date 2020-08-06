'use strict'
const {green, red} = require('chalk')
const faker = require('faker')
const db = require('../server/db')
const {User, Product} = require('../server/db/models')
const {staticUsers, staticProducts} = require('./seedStaticData')

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

    // creating record in the database
    const createdUsers = await Promise.all(
      usersToCreate.map((user) => User.create(user))
    )
    const createdProducts = await Promise.all(
      productsToCreate.map((product) => Product.create(product))
    )

    // logging seeding results in records created
    console.log(`seeded ${createdUsers.length} users`)
    console.log(`seeded ${createdProducts.length} products`)
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
