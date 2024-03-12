const express = require('express');
const router = express.Router();
const { Comment,GetAllComments } = require('../Controller/CmtController');

router.post("/comment",Comment);
router.get("/GetAllComments",GetAllComments);

module.exports = router;