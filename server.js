import express from "express";

const app = express();
app.use(express.json());

const users = [{nome: "karen", idade: 20}];

app.get('/', (req, res) => {
    res.send('oi');
});

app.post('/users', (req, res) => {
    req.body = JSON.stringify(users)


    res.status(201).send('post hihi');
});

app.get('/users', (req, res) => {
    res.status(200).json(users)
})

app.listen(3000)

