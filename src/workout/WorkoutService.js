const WorkoutService = {
    getAllWorkouts(knex) {
        return knex.select('*').from('fitness_workout')
    },
}

module.exports = WorkoutService