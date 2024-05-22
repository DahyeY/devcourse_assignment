const express = require('express');
const router = express.Router();
const conn = require('../mariadb');
const {
    join,
    login
} = require('../controller/UserController');

router.use(express.json);

// 회원가입
router.post('/join', join);

// 로그인
router.post('/login', login);

module.exports = router;