// this is controlled set of static data, which is being used during development

const staticUsers = [
  {
    name: 'Yosef Herskovitz',
    email: 'yf@fs.com',
    password: 'bagel123',
    isAdmin: true,
    googleId: null,
  },
  {
    name: 'Claudia Sinowato',
    email: 'cs@fs.com',
    password: 'bagel456',
    isAdmin: true,
    googleId: null,
  },
  {
    name: 'Richard Ke',
    email: 'rk@fs.com',
    password: 'bagel789',
    isAdmin: true,
    googleId: null,
  },
  {
    name: 'Nik Cernomorsky',
    email: 'nc@fs.com',
    password: 'bagel012',
    isAdmin: true,
    googleId: null,
  },
  {
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'adminOMG123',
    isAdmin: true,
    googleId: null,
  },
  {
    name: 'User',
    email: 'user@user.com',
    password: 'userOMG123',
    isAdmin: false,
    googleId: null,
  },
]

const staticProducts = [
  {
    name: 'Super Star',
    style: 'comfy',
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
    style: 'comfy+',
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

module.exports = {staticUsers, staticProducts}
