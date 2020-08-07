// this is controlled set of static data, which is being used during development
//
const staticUsers = [
  {
    firstName: 'Yosef',
    lastName: 'Herskovitz',
    email: 'yf@fs.com',
    password: 'bagel123',
    isAdmin: true,
    googleId: null,
  },
  {
    firstName: 'Claudia',
    lastName: 'Sinowato',
    email: 'cs@fs.com',
    password: 'bagel456',
    isAdmin: true,
    googleId: null,
  },
  {
    firstName: 'Richard',
    lastName: 'Ke',
    email: 'rk@fs.com',
    password: 'bagel789',
    isAdmin: true,
    googleId: null,
  },
  {
    firstName: 'Nik',
    lastName: 'Cernomorsky',
    email: 'nc@fs.com',
    password: 'bagel012',
    isAdmin: true,
    googleId: null,
  },
  {
    firstName: 'Admin',
    lastName: 'System',
    email: 'admin@admin.com',
    password: 'adminOMG123',
    isAdmin: true,
    googleId: null,
  },
  {
    firstName: 'User',
    lastName: 'Default',
    email: 'user@user.com',
    password: 'userOMG123',
    isAdmin: false,
    googleId: null,
  },
]

const staticProducts = [
  {
    name: 'Super Star',
    style: 'CASUAL',
    manufacturer: 'Reebok',
    description:
      "Athletic or casual rubber-soled shoes are called sneakers. ... You can also call sneakers tennis shoes, kicks, or running shoes, and if you're in Britain, you can call them trainers or plimsolls. Sneakers are made for exercise and sports, but they're also very popular everyday shoes because they're so comfortable.",
    price: 500,
    photos: [
      'https://images.unsplash.com/photo-1570037276380-c3c19487a76d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    ],
    inventory: 5,
  },
  {
    name: 'Super Star New Gen',
    style: 'RUNNING',
    manufacturer: 'Reebok',
    description:
      "Different desc 1 - Athletic or casual rubber-soled shoes are called sneakers. ... You can also call sneakers tennis shoes, kicks, or running shoes, and if you're in Britain, you can call them trainers or plimsolls. Sneakers are made for exercise and sports, but they're also very popular everyday shoes because they're so comfortable.",
    price: 500,
    photos: [
      'https://images.unsplash.com/photo-1562424995-2efe650421dd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    ],
    inventory: 10,
  },
]

const staticCarts = [
  {status: 'CREATED'},
  {status: 'PROCESSING'},
  {status: 'CREATED'},
  {status: 'CANCELLED'},
  {status: 'COMPLETED'},
]

module.exports = {staticUsers, staticProducts, staticCarts}
