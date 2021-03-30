const path = require('path')
const express = require('express')
const xss = require('xss')
const ExerciseService = require('./ExerciseService')

const ExerciseRouter = express.Router()

const serializeExercise  = exercise => ({
    id: xss(exercise.id),
    exercise_type: xss(exercise.exercise_type),
    exercise_name: xss(exercise.exercise_name),
    exercise_desc: xss(exercise.exercise_desc),
    is_active: xss(exercise.is_active)
})

ExerciseRouter
//     .route('/api/workout')
//     .get((req, res) => {
//     res.send('Hello, workout!')
// })

    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        ExerciseService.getAllExercises(knexInstance)
            .then(exercises => {
                res.json(exercises.map(serializeExercise))
            })
            .catch(next)
    })

module.exports = ExerciseRouter