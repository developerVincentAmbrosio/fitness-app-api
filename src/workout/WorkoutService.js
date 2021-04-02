const WorkoutService = {
    getAllWorkouts(knex) {
        return knex.select('*')
        .from('fitness_workout')
        .where('is_active', 1)
    },

    insertWorkout(knex, newWorkout) {
        return knex
        .insert(newWorkout)
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

    deleteWorkout(knex, id) {
        return knex('fitness_workout')
        .where( {id} )
        .delete()
    },

    updateWorkout(knex, id, updateWorkoutDetails) {
        return knex('fitness_workout')
        .where({ id })
        .update(updateWorkoutDetails)
    },
}

module.exports = WorkoutService

// insertWorkout(knex, newWorkoutDetails) {
//     return knex.insert(newWorkoutDetails)
//     .into('fitness_workout')
//     .returning('*')
//     .then(rows => {
//         return rows[0]
//     })      
// },