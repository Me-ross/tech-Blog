// Hub where we create all our routes to be exported and consumed in the server.
// create router
const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');

// prepening the routes with '/'
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

// export route
module.exports = router;
