const ExerciseService = {
    getAllExercises(knex) {
        return knex.select('*').from('fitness_exercise')
    },
}

module.exports = ExerciseService