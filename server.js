import express from "express";

const app = express();

app.get('/', (req, res) => {
    res.send('oi')
})
app.get('/users', (req, res) => {
    res.send('ok')
})

app.listen(3000)