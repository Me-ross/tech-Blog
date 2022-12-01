const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// create new Post ('/api/posts')
router.post('/', withAuth, async (req, res) => {
  try {
    console.log('****',req.body)
    console.log('~~~', req.session)
    const newPost = await Post.create({
      ...req.body,
    //   title: req.body.title,
    //   content: req.body.content,
      user_id: req.session.userId,
    });

    console.log('#15 postRoutes', req.body)
    res.status(200).json(newPost);
    // res.render('dashboard', { loggedIn: res.session.loggedIn })

  } catch (err) {
    res.status(400).json(err);
  }
});

// Create Comment ('/api/posts/comment')
router.post('/comment', withAuth, async (req, res) => {
  try {
    console.log('comment req.body', req.body)
    console.log('cmnt req.session', req.session)
    console.log('PostId',req.params.id)
    const newComment = await Comment.create({
      content: req.body.comment,
      user_id: req.session.userId,
      post_id: req.body.postId
    });
   
    console.log('newcomment', newComment)
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete existing Post (`/api/posts/${id}`)
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.userId,
      },
    });
  
    if (!postData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }
  
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update existing Post
router.put('/:id', withAuth, async (req, res) => {
    try {
      console.log('update req.body', req.body)
      const updatePost = await Post.update({
    //  what you are updating
       content: req.body.content
      },
      {
      // how do you find what you want to change
        where: { id: req.body.id}
      }
      );

    
      if (!updatePost) {
        res.status(404).json({ message: 'No project found with this id!' });
        return;
      }
    
      res.status(200).json(updatePost);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;