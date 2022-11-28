// create router
const router = require('express').Router();
const { User } = require('../../models');

// SingUp user ('/api/user')
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.loggedIn = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// login user ('/api/user/login')
router.post('/login', async (req, res) => {
  try {
    console.log('***#8 userRoutes.js', req.body);
    // retrieve user from db based on username
    const userData = await User.findOne({
      where: {username: req.body.username}
    });
    console.log('#13, userRoutes.js userData', userData)
    // exit if no user found
    if (!userData) {
      return res.status(400).json({ message: 'Incorrect username or password, please try again'});
    }

    // if user exists check password by comparing the pd in the user model and password passed from the body
    const validPassword = userData.checkPassword(req.body.password);
    console.log('validPassword', validPassword)
    if (!validPassword) {
        return res.status(400).json({ message: 'Incorrect username or password, please try again'});
    }

    // if above passes then I can create a session and send a response back.
    req.session.save(() => {
        // declare session variables you can use in other templates so you can give access to the user to certain pages and information
        req.session.userId = userData.dataValues.id;
        req.session.username = userData.dataValues.username;
        req.session.loggedIn = true;

        // send response to client
        res.status(200).json({ message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

// logout User ('/api/user/logout')
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;