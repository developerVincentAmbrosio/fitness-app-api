const UserService = {
    getAllUsers(knex) {
            return knex.select('*').from('fitness_user').where('is_active', 1)
    },
}

module.exports = UserService