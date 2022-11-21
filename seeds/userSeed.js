 const { User } = require('../models');

 const userData = [
  {
    username: 'hollyP',
    password: 'pwd23456'
  },
  {
    username: 'caraH',
    password: 'pwd12345'
  },
  {
    username: 'parkerT',
    password: 'pwd12345'
  }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;  