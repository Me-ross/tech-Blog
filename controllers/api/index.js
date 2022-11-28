// create router
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoute = require('./postRoute');

// use and prepend your userRoutes with /user
router.use('/user', userRoutes);
// use and prepend your postRoutes with /posts
router.use('/posts', postRoute);

module.exports = router;
