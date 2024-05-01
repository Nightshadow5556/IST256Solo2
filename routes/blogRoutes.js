import express from "express";
import * as blogController from '/Controller/blogController.js';

const router = express.Router();

router.get('/', blogController.getAllBlogs);

router.get('/:id', blogController.getBlogById);

router.post('/', blogController.getBlogById);

router.put('/like/:id', blogController.addBlogComment);

router.put('/:id/comment/like/:commentIndex', blogController.likeBlogComment);

router.delete("/:id", blogController.deleteBlogPost);

export default router;
