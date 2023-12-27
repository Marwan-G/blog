const express = require('express')
const axios = require('axios')

const app = express();

app.use(express.json());
app.post('/events', (req, res) => {
    const {type, data} = req.body
    if (type === 'CommentCreated') {
        const status = data.content.includes('orange') ? 'rejected' : 'approved'
        const url = 'http://eventbus:4005/events';
        axios.post(url, {
            type: "CommentModerated",
            data: {
                commentI: data.commentId,
                content: data.content,
                status,
                postId: data.postId
            }
        }).then((res) => {
            console.log("this is a resolved promise in Moderation ", res)
        }).catch((error) => {
            console.error("this is from catch in Moderation", error)
        })
    }
    res.send({});

});

app.listen(4003, () => {
    console.log("Moderation Listening on Port 4003")
});