const express = require('express');
const { createBlog,GetAutherBlog, GetAllBlog, UpdateBlog, DeleteBlog, GetsingleBlog} = require('../Controller/BlogController');
const router = express.Router();

router.post("/createBlog",createBlog);
router.get("/GetUserBlog/:id",GetAutherBlog);
router.get("/GetAllBlog",GetAllBlog);
router.put("/UpdateBlog/:id",UpdateBlog);
router.delete("/DeleteBlog/:id",DeleteBlog);
router.get("/GetsingleBlog/:id",GetsingleBlog);

module.exports = router;

