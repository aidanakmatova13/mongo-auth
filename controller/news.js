const jwt = require('jsonwebtoken')
const News = require('../models/newsModel')

const getAllNews = async (req, res) => {
    const news = await News.find({})
    res.json(news)
}

const addNews = async (req, res) => {
    try {
        const newPost = new News(req.body)
        const savedPost = await newPost //.save()
        res.json(savedPost)
    } catch (e) {
        res.status(400).json({"message" : "Ошибка сохранения"})
    }
}

const deleteNews = (req, res) => {
}

const updateNews = (req, res) => {
}

module.exports = {
    getAllNews,
    addNews,
    deleteNews,
    updateNews,
}