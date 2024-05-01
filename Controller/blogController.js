import { ListCollectionsCursor } from 'mongodb';
import BlogModel from '/model/blogModel.js';

//Get all blogs
export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await BlogModel.find();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Get blog by ID
export const getBlogById = async (req, res) => {
    try {
        const blog = await BlogModel.findById(req.params.id);
        if(!blog) {
            res.status(404).json({ message: 'Blog not found!'});
        } else {
            res.json(blog);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Create new blog post
export async function createBlogPost(req, res) {
    try {
        const { title, content, author } = req.body;
        const newBlog = new BlogModel({
            title,
            content,
            author,
            createdAt: new Date(),
            comment: [],
            likes: 0
        });
        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//Like a blog post
export async function likeBlogPost(req, res) {
    try {
        const blog = await BlogModel.findById(req.params.id);
        if(!blog) {
            res.status(404).json({ message: 'Blog not found!'});
        } else {
            blog.likes++;
            const updatedBlog = await blog.save();
            res.json(updatedBlog);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Create a blog comment
export async function addBlogComment(req, res) {
    try {
        const { userID, content } = req.body;
        const blog = await BlogModel.findById(req.params.id);
        if(!blog) {
            res.status(404).json({ message: 'Blog not found!'});
        } else {
            const newComment = {
                user: userID,
                content,
                likes: 0
            };
            blog.comments.push(newComment);
            const updatedBlog = await blog.save();
            res.json(updatedBlog);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Like blog comments
export async function likeBlogComment(req, res) {
    try {
        const blog = await BlogModel.findById(req.params.id);
        if(!blog) {
            res.status(404).json({ message: 'Blog not found!'});
        } else {
            const commentIndex = parseInt(req.params.commentIndex);
            if (isNaN(commentIndex) || commentIndex < 0 || commentIndex >= blog.comment.length) {
                res.status(404).json({ message: 'Invalid comment index'});
            } else {
                const comment = blog.comment[commentIndex];
                comment.likes++;
            }
            const updatedBlog = await blog.save();
            res.json(updatedBlog);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Delete a blog post
export async function deleteBlogPost(req, res) {
    try {
        const blog = await BlogModel.findByIdAndDelete(req.params.id);
        if(!blog) {
            res.status(404).json({ message: 'Blog not found!'});
        } else {
            res.json(blog);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}