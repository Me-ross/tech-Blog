const { Comment } = require('../models');

const commentData = [
  {
    content: 'that was useful',
    user_id: 1,
    post_id: 2,
  },
  {
    content: 'async await can be used with try catch',
    user_id: 2,
    post_id: 3,
  },
  {
    content: 'all your html routes will go here',
    user_id: 3,
    post_id: 1,
  }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;