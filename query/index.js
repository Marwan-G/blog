const express = require("express");
const cors = require('cors')
const app = express()

app.use(cors());
app.use(express.json());
posts = {};

app.get('/posts', (req, res) => {
    res.send(posts)
});
// {
//     "91f2d63b": {
//     "id": "963b",
//         "title": "this is second  post",
//         "comments": [{ "id": "ec9","content": "testComment"}]
//    }
// }
// {
//     type: "CommentCreated",
//         data: {
//     commentId,
//         content,
//         postId: req.params.id
// }
// }
// //post
// data = {
//     type: "PostCreated",
//     data: {
//         id,
//         title
//     },
// }
app.post('/events', (req, res) => {
    const {type, data} = req.body;
    if (type === "PostCreated") {
        const {id, title} = data
        posts[id] = {id, title, comments: []}
    }
    if (type === "CommentCreated") {
        const {commentId, content, postId} = {data}
        const post = posts[postId]
        post.comments.push({commentId, content})
    }
    console.log(posts, post)
});

app.listen(4002, () => {
    console.log("Query service listening on Port 4002")
});