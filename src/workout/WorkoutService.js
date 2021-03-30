const WorkoutService = {
    getAllWorkouts(knex) {
        return knex.select('*')
        .from('fitness_workout')
        .where('is_active', 1)
    },

    insertSet(knex, newSet) {
        return knex.insert(newSet)
        .into('fitness_workout')
        .returning('*')
        .then(rows => {
            return rows[0]
        })
    },

    insertRep(knex, newRep) {
        return knex.insert(newRep)
        .into('fitness_workout')
        .returning('*')
        .then(rows => {
            return rows[0]
        })
    },

    getById(knex, id) {
        return knex.from('fitness_workout')
        .select('*')
        .where('id', id)
        .first()
    },

    delete(knex, id) {
        return knex.from('fitness_workout')
        .where({ id })
        .delete()
    },

    updateSet(knex, id, updatedSet) {
        return knex.from('fitness_workout')
        .where({ id })
        .update(updatedSet)
    },


    updateRep(knex, id, updatedRep) {
        return knex.from('fitness_workout')
        .where({ id })
        .update(updatedRep)
    },

}

module.exports = WorkoutService