const express = require('express')
const axios = require('axios')
const app = express();
const cors = require('cors')
app.use(cors());
app.use(express.json());

app.post('/events', async (req, res) => {
    const event = req.body;
    await axios.post('http://comments:4001/events', event).catch((err) => console.log(err));
    await axios.post('http://posts:4000/events', event).then((res) => console.log(res));
    await axios.post('http://query:4002/events', event).then((res) => console.log(res)).catch((err) => {
        console.log(err)
    });

    res.json({status: "Im event bus respose 20OK"});
});


// const PORT = process.env || 4005
app.listen(4005, () => {
    console.log("Event buss listing on Port 4005")
})