const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// create new Post
router.post('/', withAuth, async (req, res) => {
  try {
    console.log('****',req.body)
    console.log('~~~', req.session)
    const newPost = await Post.create({
      ...req.body,
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.userId,
    });

    console.log('#15 postRoutes', req.body)
    res.status(200).json(newPost);
    // res.render('dashboard', { loggedIn: res.session.loggedIn })

  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;