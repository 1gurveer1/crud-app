const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const Blog = require('../models/Blog');

//----------------------------fetching Blogs----------------------------//

router.get('/fetchblogs', fetchuser, async (req, res) => {
    try {
        const blogs = await Blog.find({ user: req.user.id });
        res.json(blogs);

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error occured");
    }
})


//---------------------------adding blogs------------------------------//

router.post('/addblog', fetchuser, [
    body('title', 'title must be atleast 3 characters').isLength({ min: 3 }),
    body('body', 'body must be atleast 5 characters').isLength({ min: 5 }),

], async (req, res) => {
    try {
        const { title, body, author, image } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const blog = new Blog({
            title, body, author,image, user: req.user.id
        })

        const saveBlog = await blog.save()
        res.json(saveBlog)

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error occured");
    }
})

//---------------------------Updating blogs------------------------------//

router.put('/updateblog/:id', fetchuser, async (req, res) => {
    const { title, body, author, image } = req.body;

    try {
        const newBlog = {};
        if (title) {
            newBlog.title = title;
        }
        if (body) {
            newBlog.body = body;
        }
        if (author) {
            newBlog.author = author;
        }
        if (image) {
            newBlog.image = image;
        }

        let blog = await Blog.findById(req.params.id)

        if (!blog) {
            return res.status(401).send("Not found")
        }

        if (blog.user.toString() !== req.user.id) {
            return res.status(401).send("Access denied");
        }

        blog = await Blog.findByIdAndUpdate(req.params.id, { $set: newBlog }, { new: true })
        res.json({ blog });

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error occured");
    }

})

//---------------------------Deleting blogs------------------------------//

router.delete('/deleteblog/:id', fetchuser, async (req, res) => {

    try {
        let blog = await Blog.findById(req.params.id)

        if (!blog) {
            return res.status(401).send("Not found")
        }

        if (blog.user.toString() !== req.user.id) {
            return res.status(401).send("Access denied");
        }

        blog = await Blog.findByIdAndDelete(req.params.id)
        res.json({ "Deleted": "Blog has been deleted successfully", blog: blog });

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error occured");
    }

})

module.exports = router