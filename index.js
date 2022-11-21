const express = require('express')

const PORT = process.env.PORT || 5000

const app = express()

app.get('/', (req, res) => {
    res.send('POSTGRES + NODEJS')
})

app.listen(PORT, () => console.log(`Server has been started on port: ${PORT}...`))