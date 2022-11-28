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

const seedUsers = async () => {
  const users = await User.bulkCreate(userData, {
  individualHooks: true,
  return: true,
});
} 

module.exports = seedUsers;  