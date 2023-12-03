const express = require('express');
const app = express();
const crypto = require('crypto');

app.use(express.json())
const commentsByPostId = {};
app.get('/posts/:id/comments', (req, res, next) => {

})
app.post('/posts/:id/comments', (req, res, next) => {
    const commentId = crypto.randomBytes(4).toString('hex');
// comments from body + id params in an array
    const {content} = req.body;
    const comments = commentsByPostId[req.params.id] || [];
    comments.push(content, commentId)
})

app.listen(3000, () => console.log("comments service listen on Port 3000"))