const TrackerService = {
    getAllWorkouts(knex) {
        return knex.select('*').from(workout)
    },
}

module.exports = TrackerService