const { Post } = require('../models');

const postData = [
  {
    title: 'How to Seed Data',
    content: 'Each model needs to have a seed.js file that first requires the model and then hard codes each attribute. use the bulkcreate method and make sure to export the file',
    user_id: 1
  },
  {
    title: 'Using try-catch in the router',
    content: 'use findall method in the try and then map the data and then make sure to serialized the data. Catch the error in this section',
    user_id: 2
  },
  {
    title: 'View folder setup',
    content: 'view folders have to have a layouts folder embedded. make sure to include the main.handlebars file in the layouts folder',
    user_id: 3
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;