require('dotenv').config();

const express = require('express');
const router = express.Router();
const database = require('../config/database');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const db = await database;

    const results = await db.collection('bloggy').find({}).toArray()

    res.json(results)

  } catch (error) {
    console.log(`Error querying database: ${error}`);

    res.status(500).json({error: `Internal server error`});
  }
});

module.exports = router;
// Update post route
router.put('/:id', validatePost, async (req, res) => {
  const { id } = req.params;
  const { title, content, category, featured } = req.body;

  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { title, content, category, featured },
      { new: true, runValidators: true }
    );

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Delete post route
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
