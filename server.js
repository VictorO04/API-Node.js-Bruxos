import express from "express";
import dotenv from "dotenv";
import bruxosRoutes from "./src/routes/bruxosRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();
const serverPort = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Servidor Rodando");
});

app.use("/bruxos", bruxosRoutes);

app.listen(serverPort, () => {
    console.log(`Servidor funcionando em: http://localhost:${serverPort}`);
});