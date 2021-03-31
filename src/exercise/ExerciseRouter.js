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

    .route('/')
    .get((req, res, next) => {
        ExerciseService.getAllExercises(req.app.get('db'))
            .then(exercise => {
                res.json(exercise.map(serializeExercise))
            })
            .catch(next)
    })

module.exports = ExerciseRouter