import express from 'express';

const app = express();
const PORT = 5000;

app.use(express.json());

let users = [
    { id: 1, nome: "Joao", email: "joao@gmail.com", age: 25 },
    { id: 2, nome: "Eduardo", email: "eduardoalmeida2004@gmail.com", age: 28 },
]

app.get("/users", (req, res) => {
    res.status(200).json({
        succes: true,
        data: users
    });
});
app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).json({
            sucess: false,
            message: "Error, unexisted ID"
        });
    }
    else {
        const user = users.filter((aux) => {
            return aux.id === Number(id)
        });

        if (user !== undefined) {
            res.status(200).json({
                sucess: true,
                data: user
            });
        }
        else {
            res.status(400).json({
                sucess: false,
                message: "User not finded"
            });
        }
    }
})

app.post("/users", (req, res) => {
    const { name, email, age } = req.body;

    if (!name || !email || !age) {
        res.status(400).json({
            success: false,
            message: "Invalid info"
        });
    }
    else {
        const user = {
            id: users[users.length - 1].id + 1,
            name,
            email,
            age
        };


        users.push(user);

        res.status(200).json({
            success: true,
            message: "User created"
        });
        
    }
})


app.listen(PORT, () => {
    console.log(`Listening on: http://localhost:${PORT}`);
});


