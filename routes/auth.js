const express = require('express')
const {singIn, singUp} = require('../controller/auth')

const router = express.Router()

router.post('/signup', singUp)
router.post('/signin', singIn)

module.exports = router