import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import acidenteRoutes from "./routes/acidenteRoutes.js";

dotenv.config();

const app = express();

connectDB();

// middlewares
app.use(cors());
app.use(express.json());

// rota de teste
app.get("/", (req, res) => {
  res.send("API de registro de acidentes rodando");
});

// rotas dos acidentes
app.use("/acidentes", acidenteRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});