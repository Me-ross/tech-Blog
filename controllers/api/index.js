// create router
const router = require('express').Router();
const userRoutes = require('./userRoutes');

// use and prepend your userRoutes with /user
router.use('/user', userRoutes);

module.exports = router;
