const path = require('path')
const express = require('express')
const xss = require('xss')
const WorkoutService = require('./WorkoutService')

const WorkoutRouter = express.Router()
//const jsonParser = express.json()

const serializeWorkout  = workout => ({
    id: xss(workout.id),
    use_id: xss(workout.use_id),
    ex_id: xss(workout.ex_id),
    set_number: xss(workout.set_number),
    num_of_reps: xss(workout.num_of_reps),
    weight_used: xss(workout.weight_used),
    date_completed: xss(workout.date_completed),
    is_active: xss(workout.is_active)
})

 WorkoutRouter
//     .route('/api/workout')
//     .get((req, res) => {
//     res.send('Hello, workout!')
// })

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