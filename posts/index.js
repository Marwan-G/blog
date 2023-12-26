const express = require('express')
const crypto = require('crypto');
const axios = require("axios");
const app = express();
const posts = {};

app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
});
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
    // Emmit event
    const data = {
        type: "PostCreated",
        data: {
            id,
            title
        },
    }

    axios.post('http://eventbus:4005/events', data, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
            proxy: false
        },
    }).then((res) => {
        console.log("this is a resolved promese ", res.status)
    }).catch((error) => {
        console.error("this is frm catch", error)
    })

    // console.log("Event response:", response.data);

    res.status(201).json(posts[id]);
});

// Event bus forward events that it received to this service on /events
app.post('/events', (req, res) => {
    // res.send({status: req.body.data.title})
    res.json({
        status: req.body.data.title,
        comment: "event received  form eventbus into Post service on route /events"
    })
})
app.listen(4000, () => {
    console.log("Posts up and listening on Port 4000")
})