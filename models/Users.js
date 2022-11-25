const db = require('./db')

const Users = db.sequelize.define('users', {
    nickname: {
        type: db.Sequelize.STRING
    },
    email: {
        type: db.Sequelize.STRING
    },
    password: {
        type: db.Sequelize.INTEGER
    }
})

//Users.sync({force: true})

module.exports = Users