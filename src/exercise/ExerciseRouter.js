const path = require('path')
const express = require('express')
const xss = require('xss')
const ExerciseService = require('./ExerciseService')

const ExerciseRouter = express.Router()
const jsonParser = express.json()

const serializeExercise  = exercise => ({
    id: xss(exercise.id),
    exercise_type: xss(exercise.exercise_type),
    exercise_name: xss(exercise.exercise_name),
    exercise_desc: xss(exercise.exercise_desc),
    is_active: xss(exercise.is_active),
})

ExerciseRouter
    .route('/')

    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        ExerciseService.getAllExercises(knexInstance)
            .then(exercises => {
                res.json(exercises.map(serializeExercise))
            })
            .catch(next)
    })

    .post(jsonParser, (req, res, next) => {
        const { exercise_type, exercise_name, exercise_desc } = req.body
        const newExercise  = { exercise_type, exercise_name, exercise_desc }

        for (const[key, value] of Object.entries(newExercise))
        if (value == null)
            return res.status(400).json({
                error: { message: `${key} is required`}
            })

    ExerciseService.insertExercise(req.app.get('db'), newExercise)
        .then(exercise => {
            res
                .status(201)
                .location(path.posix.join(req.originalUrl, `/${exercise.id}`))
                .json(serializeExercise(exercise))
        })
        .catch(next)
    })

    ExerciseRouter
        .route('/:id')
        .all((req, res, next) => {
            ExerciseService.getById(
                req.app.get('db'),
                req.params.id
            )
                .then(exercise => {
                    if(!exercise) {
                        return res.status(404).json({
                            error: {message: `Exercise does not exist`}
                        })
                    }
                    res.exercise = exercise
                    next()
                })
                .catch(next)
        })

        .get((req, res, next) => {
            res.json(serializeExercise(res.exercise))
        })

        .delete((req, res, next) => {
            ExerciseService.deleteExercise(
                req.app.get('db'),
                req.params.id
            )
            then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
        })

        .patch(jsonParser, (req, res, next) => {
            const { exercise_type, exercise_name, exercise_desc } = req.body
            const exerciseToUpdate = { exercise_type, exercise_name, exercise_desc }

            const numberOfValues = Object.values(exerciseToUpdate).filter(Boolean).length
            if (numberOfValues === 0)
            return res.status(400).json({
                error: {
                    message: `${key} must have content`
                }
            })
            ExerciseService.updateExercise(
                req.app.get('db'),
                req.params.id,
                exerciseToUpdate
            )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
        })

    
module.exports = ExerciseRouter