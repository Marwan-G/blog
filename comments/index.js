const express = require('express');
const app = express();
const crypto = require('crypto');

app.use(express.json())
const commentsByPostId = {};
app.get('/posts/:id/comments', (req, res, next) => {
    const comments = commentsByPostId[req.params.id] || [];
    res.send({"allcomments": comments})
})
app.post('/posts/:id/comments', (req, res, next) => {
    const commentId = crypto.randomBytes(4).toString('hex');
// comments from body + id params in an array
    const {content} = req.body;
    const comments = commentsByPostId[req.params.id] || [];
    comments.push({"id": commentId, content});
    commentsByPostId[req.params.id] = comments;
    // res.json({"commentsByPostId": commentsByPostId})
    res.send(commentsByPostId)
})

app.listen(4001, () => console.log("comments service listen on Port 4001"))
