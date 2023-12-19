const express = require('express');
const cors = require('cors')
const app = express();
const crypto = require('crypto');

app.use(express.json())
app.use(cors())
const commentsByPostId = {};
app.get('/posts/:id/comments', (req, res, next) => {
    const comments = commentsByPostId[req.params.id] || [];
    res.send(comments)
})
app.post('/posts/:id/comments', (req, res, next) => {
    const commentId = crypto.randomBytes(4).toString('hex');
// comments from body + id params in an array
    const {content} = req.body;
    const comments = commentsByPostId[req.params.id] || [];
    comments.push({"id": commentId, content});
    commentsByPostId[req.params.id] = comments;
    // res.json({"commentsByPostId": commentsByPostId})
    res.send(comments)
})

app.listen(4001, () => console.log("comments service listen on Port 4001"))
