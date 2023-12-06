const express = require('express')
const app = express();
const crypto = require('crypto');
app.use(express.json());
const posts = {};
app.get('/posts', (req, res) => {
    res.send(posts)
})
app.post('/posts', (req, res,) => {
    const id = crypto.randomBytes(4).toString('hex')
    const {title} = req.body;
    console.log("amazing marwan mussa ghubein");
  
    posts[id] = {
        id,  // Shorthand for id:
        title  // Shorthand for id: id
    };

    res.status(201).json(posts[id])
});

app.listen(4000, () => {
    console.log("Posts up and listening on Port 4000")
})