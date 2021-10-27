const Users = require('../models/authModel')
const jwt = require('jsonwebtoken')

const singUp = (req, res) => {
    const {name, password, email} = req.body
    Users.findOne({email}).exec((error, user) => {
        if (user) {
            return res.status(400).json({error: "Email уже существует"})
        }
        let newUser = new Users({name, email, password})
        newUser.save((error, savedUser) => {
            if (error) {
                return res.status(404).json({error: "Ошибка сохранеия"})
            }
            return res.json({message: "Пользователь успешно зарегистрирован"})
        })
    })
}

const singIn = (req, res) => {
    const {email, password} = req.body
    Users.findOne({email}).exec(async (error, user) => {
        if (!user) {
            return res.status(400).json({error: "Пользователь не найден"})
        }
        const correctPassword = await user.authenticate(password)

        if (!correctPassword) {
            return res.status(400).json({error: "Пароль или email неверны"})
        }
        const token = jwt.sign({_id: user._id}, process.env.SECRET_KEY, {expiresIn: "5d"}) //создаем токен

        return res.json({
            token: token,
            user: {_id: user._id, name: user.name, email: user.email, role: user.role}
        })
    })
}

const authenticate = (req, res) => {
    try {
        const userId = jwt.verify(req.body.token, process.env.SECRET_KEY) //расшифровываем token
        Users.findOne({_id: userId._id}).exec(async (error, user) => {
            return res.json({
                token: req.body.token,
                user: {_id: user._id, name: user.name, email: user.email, role: user.role}
            }) //ответ на клиент возвращаем токен и user
            }
        )
    } catch (e) {
        res.status(401).json({message: "not authorized"})
    }

}


module.exports = {singUp, singIn, authenticate}