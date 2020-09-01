console.clear()
const express = require('express')
const { checkCredentials } = require("./bin/loginMagister")
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
app.post("/api/login", (req, res) => {
    checkCredentials(req.body).then(d => {
        res.json(d)
    }).catch(err => {
        res.json(400, err)
    })
})

app.listen(3000)