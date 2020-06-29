const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Posts = require('../../models/Posts');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { json } = require('express');

// @route   POST api/posts
// @desc    Create a Post
// @access  Private
router.post('/', [auth, [
    check('text', 'Text is required').not().isEmpty()
] ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await  User.findById(req.user.id).select('-password');
    
        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        })
        
        const post = await newPost.save()

        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }

});

// @route   GET api/posts/:id
// @desc    Get post by ID
// @access  Private
router.get('/:id', auth ,async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).sort({ date: -1 });
        
        if(!post) {
            return res.status(4040).json({ msg: 'Post not found' })
        }
        
        res.json(post);
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId') {
            return res.status(4040).json({ msg: 'Post not found' })
        }
        res.status(500).send('Server Error')
    }
})

module.exports = router;