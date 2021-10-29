const jwt = require('jsonwebtoken')
const News = require('../models/newsModel')
const Users = require('../models/authModel')

const getAllNews = async (req, res) => {
    try {
        const news = await News.find({}).populate("user", "-password")
        res.json(news)
    } catch (e) {
        res.status(400).json({"message" : "Ошибка получения"})
    }
}

const getNews = async (req, res) => {
    try {
        const news = await News.findById(req.params.id).populate("user", "-password")
        res.json(news)
    } catch (e) {
        res.status(400).json({"message" : "Ошибка получения"})
    }
}

const createNews = async (req, res) => {
    try {
        const newPost = new News(req.body)
        const savedPost = await newPost.save()//.save()
        await Users.updateOne({_id: savedPost.user}, {$push: {news: savedPost._id}})
        res.json(savedPost)
    } catch (e){
        res.status(400).json({"message" : "Ошибка сохранения"})
    }
    // const newPost = new News(req.body)
    // const savedPost = await newPost.save() //.save()
    // await Users.updateOne({_id: savedPost.user}, {$push: {news: savedPost._id}})
    // console.log(savedPost)
    // res.json(savedPost)
}

const deleteNews = (req, res) => {
}
const updateNews = (req, res) => {
}

module.exports = {
    getAllNews,
    createNews,
    deleteNews,
    updateNews,
    getNews
}