const express = require('express');
const cors = require('cors')
const crypto = require('crypto');
const axios = require("axios");
const app = express();

app.use(express.json())
app.use(cors())
const commentsByPostId = {};
app.get('/posts/:id/comments', (req, res, next) => {
    const comments = commentsByPostId[req.params.id] || [];
    res.send(comments)
})
app.post('/posts/:id/comments', async (req, res, next) => {
    const commentId = crypto.randomBytes(4).toString('hex');
// comments from body + id params in an array
    const {content} = req.body;
    const comments = commentsByPostId[req.params.id] || [];
    comments.push({id: commentId, content, status: 'pending'});
    commentsByPostId[req.params.id] = comments;
    // res.json({"commentsByPostId": commentsByPostId})

//Emmit Event

    const data =
        {
            type: "CommentCreated",
            data: {
                commentId,
                content,
                status: 'pending',
                postId: req.params.id
            }
        }
    const url = 'http://eventbus:4005/events';

    await axios.post(url, data).then((res) => {
        console.log("this is a resolved promise in Comments ", res)
    }).catch((error) => {
        console.error("this is from catch in Comments", error)
    })
    res.status(201).send(comments);
});
app.post('/events', async (req, res) => {
    const {type, data} = req.body;
    if (type === 'CommentModerated') {
        const {postId, content, commentId, status} = data
        const comments = commentsByPostId[data.postId]
        comment = comments.find(comment => {
            return comment.commentId === commentId

        })
        comment.status = status;

        await axios.post('http://eventbus:4005/events', {
            type: 'CommentUpdated',
            data: {
                postId,
                content,
                commentId,
                status
            }
        }).catch((err) => {
            console.log("here is the err Marwan", err)
        })

    }

    res.send("event received  form eventbus into Comment Service on route /events"
    );
})

app.listen(4001, () => console.log("comments service listen on Port 4001"));
