const db = require('../db')
class UserController {
    async createUser(req, res) {
        try {
            const {name, surname} = req.body
            // values ($1, $2) = [name, surname]    //    $1 = name, $2 = surname
            const newPerson = await db.query(`INSERT INTO person (name, surname) values ($1, $2) RETURNING *`, [name, surname])

            res.json(newPerson.rows[0])
        } catch(err) {
            res.status(500).json(err)
        }
    }

    async getUsers(req, res) {
        try {
            const users = await db.query(`SELECT * FROM person`)

            res.json(users.rows)
        } catch(err) {
            res.status(500).json(err)
        }
    }

    async getOneUser(req, res) {
        try {
            const id = req.params.id
            const user = await db.query(`SELECT * FROM person WHERE id = $1`, [id])

            res.json(user.rows[0])
        } catch(err) {
            res.status(500).json(err)
        }
    }

    async updateUser(req, res) {
        try {
            const id = req.params.id
            const {name, surname} = req.body
            const user = await db.query(`UPDATE person SET name = $1, surname = $2 WHERE id = $3 RETURNING *`, [name, surname, id])

            res.json(user.rows[0])
        } catch(err) {
            res.status(500).json(err)
        }
    }

    async deleteUser(req, res) {
        try {
            const id = req.params.id
            const user = await db.query(`DELETE FROM person WHERE id = $1`, [id])

            res.json(user.rows[0])
        } catch(err) {
            res.status(500).json(err)
        }
    }
}

module.exports = new UserController()