import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from 'cors';

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors())


app.get('/', (req, res) => {
    res.send('oi');
});

//criando usuário
app.post('/users', async (req, res) => {
    
    await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        }
    })
    res.status(201).send({message: `Usuário ${req.body.name} foi criado!`});
});

//modificando usuario 
app.put('/users/:id', async (req, res) => {
    
    await prisma.user.update({
        where : {
            id: req.params.id
        },
        data: {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        }
    })
    res.status(201).send(req.body);
});

//deletando usuarios

app.delete('/users/:id', async (req, res) => {
    
    await prisma.user.delete({
        where : {
            id: req.params.id
        }
    })
    res.status(201).send({message: 'Usuário deletado!'});
});


//pegando todos os usuários
app.get('/users', async (req, res) => {

    let users = []
    if(req.query){
        users = await (prisma.user.findMany(
            {
                where: {
                    name: req.query.name,
                    email: req.query.email,
                    age: req.query.age
                }
            }
        ))
    }else{
        users = await prisma.user.findMany();
    }
   

    res.status(200).json(users);
})


app.listen(3000)

