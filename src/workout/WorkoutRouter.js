const path = require('path')
const express = require('express')
const xss = require('xss')
const WorkoutService = require('./WorkoutService')

const WorkoutRouter = express.Router()
const jsonParser = express.json()

const serializeWorkout  = workout => ({
    workout_id: xss(workout.workout_id),
    user_id: xss(workout.user_id),
    exercise_id: xss(workout.exercise_id),
    set_number: xss(workout.set_number),
    num_of_reps: xss(workout.num_of_reps),
    weight_used: xss(workout.weight_used),
    date_completed: xss(workout.date_completed),
    is_active: xss(workout.is_active)
})

WorkoutRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        WorkoutService.getAllWorkouts(knexInstance)
            .then(workouts => {
                res.json(workouts.map(serializeWorkout))
            })
            .catch(next)
    })

module.exports = WorkoutRouter    