const db = require('../db')

class PostController {
    async createPost(req, res) {
        try {
            const {title, content, userId} = req.body
            const newPost = await db.query(`INSERT INTO post (title, content, user_id) values ($1, $2, $3) RETURNING *`, [title, content, userId])

            res.json(newPost.rows[0])
        } catch(err) {
            res.status(500).json(err)
        }
    }

    async getPostByUser(req, res) {
        try {
            const id = req.params.id
            const posts = await db.query(`SELECT * FROM post WHERE user_id = $1`, [id])

            res.json(posts.rows)
        } catch(err) {
            res.status(500).json(err)
        }
    }
}

module.exports = new PostController()