const express = require('express');
const router = express.Router();
const { Register,login, GetOneAuther,Protected,TestController,} = require('../Controller/UserController');
const {verifyToken, isAdmin} =require('../middlewares/authMiddleware')


router.post("/register",Register);
router.post("/login",login);
router.get("/GetOneAuther/:id",GetOneAuther);
router.get('/protected', verifyToken,Protected);
router.get("/test",isAdmin,TestController);
module.exports = router;


// Example route with token verification middleware
