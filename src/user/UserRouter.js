const path = require('path')
const express = require('express')
const xss = require('xss')
const UserService = require('./UserService')

const UserRouter = express.Router()

const serializeUser  = user => ({
    id: xss(user.id),
    first_name: xss(user.first_name),
    last_name: xss(user.last_name),
    email: xss(user.email),
    user_pass: xss(user.user_pass),
    is_active: xss(user.is_active)
})

UserRouter
//     .route('/api/user')
//     .get((req, res) => {
//     res.send('Hello, users')
// })

    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        UserService.getAllUsers(knexInstance)
            .then(users => {
                res.json(users.map(serializeUser))
            })
            .catch(next)
    })

module.exports = UserRouter