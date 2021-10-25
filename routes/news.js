const express = require('express')
const {getAllNews, deleteNews, updateNews, addNews} = require('../controller/news')

const router = express.Router()

router.get('/', getAllNews)
router.delete('/', deleteNews)
router.post('/', addNews)
router.patch('/', updateNews)


module.exports = router