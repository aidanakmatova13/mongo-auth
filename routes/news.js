const express = require('express')
const {getAllNews, deleteNews, updateNews, createNews} = require('../controller/news')

const router = express.Router()

router.get('/', getAllNews)
router.delete('/', deleteNews)
router.post('/', createNews)
router.patch('/', updateNews)


module.exports = router