import express from "express";
import userRoute from "./routes/user.route.js"

const app = express();

app.use(express.json());

app.use("/users", userRoute);

app.listen(5000, () => {
  console.log("Servidor rodando em http://localhost:5000");
});
