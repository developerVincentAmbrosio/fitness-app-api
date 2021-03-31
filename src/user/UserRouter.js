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
    .route('/')
    .get((req, res, next) => {
        UserService.getAllUsers(req.app.get('db'))
            .then(user => {
                res.json(user.map(serializeUser))
            })
            .catch(next)
    })

module.exports = UserRouter