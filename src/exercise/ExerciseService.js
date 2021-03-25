const ExerciseService = {
    getAllExercises(knex) {
        return knex.select('*')
        .from('fitness_exercise')
        .where('is_active', 1)
    },

    insertExercise(knex, newExercise) {
        return knex.insert(newExercise)
        .into('fitness_exercise')
        .returning('*')
        .then(rows => {
            return rows[0]
        })
    },

    getById(knex, id) {
        return knex.from('fitness_exercise')
        .select('*')
        .where('id', id)
        .first()
    },

    deleteExercise(knex, id) {
        return knex.from('fitness_exercise')
        .where({ id })
        .delete()
    },

    updateExercise(knex, id, newExerciseNotes) {
        return knex.from('fitness_exercise')
        .where({ id })
        .update(newExerciseNotes)
    },

}

module.exports = ExerciseService