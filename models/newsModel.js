const mongoose = require('mongoose');


//создаем mongo - схему
const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        max: 28
    },
    description: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    }
}, {timestamps: true})

const newsModel = mongoose.model("news", newsSchema)

module.exports = newsModel