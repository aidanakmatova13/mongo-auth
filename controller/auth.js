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
            if (error){
                return res.status(404).json({error: "Ошибка сохранеия"})
            }
            return res.json({message: "Пользователь успешно зарегистрирован"})
        })
    })
}

const singIn = (req, res) => {
    const {email, password} = req.body
    Users.findOne({email}).exec(async (error, user) =>{
        if (error) {
            return  res.status(400).json({error: "Пользователь не найден"})
        }
        const correctPassword = await user.authenticate(password)

        if (!correctPassword) {
            return res.status(400).json({error: "Пароль или email неверны"})
        }
        const token = jwt.sign({_id: user._id}, process.env.SECRET_KEY, {expiresIn: "5d"})

        return res.json({token: token, user: {_id: user._id, name: user.name, email: user.email, role: user.role}})
    })
}


module.exports = {singUp , singIn}