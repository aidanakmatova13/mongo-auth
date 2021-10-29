const express = require('express')
const {getAllNews, deleteNews, updateNews, createNews,getNews} = require('../controller/news')

const router = express.Router()

router.get('/', getAllNews)
router.get('/:id', getNews)
router.delete('/', deleteNews)
router.post('/', createNews)
router.patch('/', updateNews)


module.exports = router