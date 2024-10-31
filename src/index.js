import express from "express";

const app = express();

let usuarios = [
  { id: 1, nome: "João", email: "joao@email.com", idade: 25 },
  { id: 2, nome: "João Pedro", email: "joao2@email.com", idade: 20 },
  { id: 3, nome: "Paulo", email: "paulo@email.com", idade: 37 },
  { id: 4, nome: "Marcão", email: "marcos@email.com", idade: 29 },
];

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello FIPP 2");
});

app.get("/usuarios", (req, res) => {
  res.status(200).json({ succes: true, data: usuarios });
});

app.get("/usuarios/:id", (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).json({ succes: false, message: "Manda o ID" });
  } else {
    const usuarioEncontrado = usuarios.find(
      (usuario) => usuario.id === Number(id)
    );

    if (usuarioEncontrado !== undefined) {
      res.status(200).json({
        succes: true,
        data: usuarioEncontrado,
      });
    } else {
      res.status(404).json({
        succes: false,
        message: "Usuário não encontrado",
      });
    }
  }
});

app.post("/usuarios", (req, res) => {
  const { nome, email, idade } = req.body;

  if (!nome || !email || !idade) {
    res.status(400).json({
      success: false,
      message: "Informações inválidas",
    });
  } else {
    const novoUsuario = {
      id: usuarios[usuarios.length - 1].id + 1,
      nome,
      email,
      idade,
    };

    usuarios.push(novoUsuario);

    res
      .status(200)
      .json({ sucess: true, message: "Usuario criado com sucesso!" });
  }
});

app.listen(5000, () => {
  console.log("Servidor rodando em http://localhost:5000");
});
