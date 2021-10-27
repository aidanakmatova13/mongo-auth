
const express = require('express')
const {singIn, singUp, authenticate, getUserInfo} = require('../controller/auth')

const router = express.Router()

router.get('/user/:id', getUserInfo)
router.post('/signup', singUp)
router.post('/signin', singIn)
router.post('/authenticate', authenticate)

module.exports = router