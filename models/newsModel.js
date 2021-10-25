const mongoose = require('mongoose');
const {Schema} = require("mongoose");


//создаем mongo - схему
const newsSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    user_id: {type: String, required: true}
})

const newsModel = mongoose.model("news", newsSchema)

module.exports = newsModel