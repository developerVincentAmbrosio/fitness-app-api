const path = require('path')
const express = require('express')
const xss = require('xss')
const WorkoutService = require('./WorkoutService')

const WorkoutRouter = express.Router()
const jsonParser = express.json()

const serializeWorkout  = workout => ({
    id: xss(workout.id),
    use_id: xss(workout.use_id),
    ex_id: xss(workout.ex_id),
    set_number: xss(workout.set_number),
    num_of_reps: xss(workout.num_of_reps),
    weight_used: xss(workout.weight_used)//,
 //   date_completed: xss(workout.date_completed),
//    is_active: xss(workout.is_active)
})

WorkoutRouter
    .route('/')
    .get((req, res, next) => {
        WorkoutService.getAllWorkouts(req.app.get('db'))
            .then(workout => {
                res.json(workout.map(serializeWorkout))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { set_number, num_of_reps, weight_used } = req.body
        const newWorkout  = { set_number, num_of_reps, weight_used }
 
        for (const[key, value] of Object.entries(newWorkout))
        if (value == null)
            return res.status(400).json({
            })

        WorkoutService.insertWorkout(req.app.get('db'), newWorkout)
            .then(workout => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${workout.id}`))
                    .json(serializeWorkout(workout))
        })
        .catch(next)
    })

    WorkoutRouter
        .route('/:workout_id')
        .all((req, res, next) => {
            WorkoutService.getById(req.app.get('db'), req.params.workout_id)
                .then(workout => {
                    if(!workout) {
                        return res.status(404).json({
                            error: {message: `Exercise does not exist`}
                        })
                    }
                    res.workout = workout
                    next()
                })
                .catch(next)
        })

        .get((req, res, next) => {
            res.json(serializeWorkout(res.workout))
        })

        .delete((req, res, next) => {
            const { workout_id } = req.params
            WorkoutService.deleteWorkout(req.app.get('db'), workout_id)
            then(() => {
                res.status(204).end()
            })
            .catch(next)
        })

        .patch(jsonParser, (req, res, next) => {
            const { set_number, num_of_reps, weight_used } = req.body
            const workoutToUpdate  = { set_number, num_of_reps, weight_used }

            const numberOfValues = Object.values(workoutToUpdate).filter(Boolean).length
            if (numberOfValues === 0)
            return res.status(400).json({
                error: {
                    message: `${key} must have content`
                }
            })
            WorkoutService.updateWorkout(req.app.get('db'), req.params.workout_id, workoutToUpdate)
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
        })

    
module.exports = WorkoutRouter