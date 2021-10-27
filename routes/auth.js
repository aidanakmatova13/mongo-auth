
const express = require('express')
const {singIn, singUp, authenticate} = require('../controller/auth')

const router = express.Router()

router.post('/signup', singUp)
router.post('/signin', singIn)
router.post('/authenticate', authenticate)

module.exports = router