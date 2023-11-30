const express = require('express')
const app = express();
const randomBytes = require('crypto');
app.use(express.json());
const posts = {};
app.get('/posts', (req, res) => {

})
app.post('/posts', (req, res,) => {
    const id = randomBytes(4).toString('hex')
    const {title} = req.body;
    posts[id] = {
        id, title
    };
});

app.listen(4000, () => {
    console.log("App up and listening on Port 4000")
})