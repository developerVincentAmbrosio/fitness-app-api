const ExerciseService = {
    getAllExercises(knex) {
        return knex.select('*').from('fitness_exercise').where('is_active', 1)
    },
}

module.exports = ExerciseService