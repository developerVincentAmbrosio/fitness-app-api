const WorkoutService = {
    getAllWorkouts(knex) {
            return knex.select('*').from('fitness_workout').where('is_active', 1)
    },
}

module.exports = WorkoutService