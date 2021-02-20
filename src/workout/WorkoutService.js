const WorkoutService = {
    getAllWorkouts(knex) {
        return knex.select('*').from(workout)
    },
}

module.exports = WorkoutService