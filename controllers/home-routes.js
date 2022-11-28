// create router
const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// get all posts testing to see if it works
// router.get('/', async (req, res) => {
//   res.send('Render homepage view along with all posts retreived from database.');
// });

// get all posts
router.get('/', async (req, res) => {
  console.log('**#13,home-routes.js', req.session)
  try {
    // retrieve all posts from db - since using async have to use corresponding await and save the results of the await in a variable --- getting the value of the await from the Post model so have to import the Model on top using require -- 
    const dbPostData = await Post.findAll({
      include: [User]
    })
    // Serealize the Data retrieved so views can parse & read it, result of the above dpPostData is an Array of posts. We need to map through each post and apply the get methods of wanting it plain and no metadata plain:true
    const posts = dbPostData.map((post) =>
      post.get({ plain: true })
    );
    // Respond with rendering the template 'homepage' along with data received -- Data has to be packaged into an {} property name you choose in this case posts: and the value is the array of posts that we declared above and console logged.. since they are the same name we can only use one name
    res.render('allPosts', { posts:posts, loggedIn: req.session.loggedIn });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get a single post
router.get('/post/:id', async (req, res) => {
  // res.send(`Render single-post view along with the post with id ${req.params.id} retreived from database.`);
  try {
    const dpPostData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const post = dpPostData.get({ plain: true });
    res.render('singlePost', { 
      ...post,
      loggedIn: req.session.loggedIn 
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// login route
router.get('/login', async (req, res) => {
  // res.send('Render login view.');
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

// singup
router.get('/signup', async (req, res) => {
  res.render('signup');
});

// dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    console.log('#74 homeroutes.js', req.session)
    const userData = await User.findByPk(req.session.userId, {
      attributes: { exclude: ['password'] },
      include: [{ 
        model: Post }],
    });

    const user = userData.get({ plain: true });
    console.log('#84user homeroutes.js', user)
    res.render('dashboard', {
      ...user,
      loggedIn: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
