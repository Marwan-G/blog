const express = require('express')
const crypto = require('crypto');
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors());
const posts = {};
app.get('/posts', (req, res) => {
    res.send(posts)
})
app.post('/posts', (req, res,) => {
    const id = crypto.randomBytes(4).toString('hex')
    const {title} = req.body;
    posts[id] = {
        id,  // Shorthand for id:id
        title  // Shorthand for title:title
    };
    res.status(201).json(posts);
});

app.listen(4000, () => {
    console.log("Posts up and listening on Port 4000")
})