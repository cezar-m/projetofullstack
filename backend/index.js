import express from "express";
import connection from "./connection/Conexao.js";
import UsuarioRotas from "./routes/UsuarioRotas.js";
import ProdutoRotas from "./routes/ProdutoRotas.js";
import AutenticacaoRotas from "./routes/AutenticacaoRotas.js";
import NovidadeRotas from "./routes/NovidadeRotas.js";
import cors from "cors";
import multer from "multer";
import path from "path";
import bodyParser from "body-parser";
import session from "express-session";

const app = express();
const port = 5000;

app.use(express.json());

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000', // Substitua pelo endereço do seu frontend
  credentials: true
}));

app.use('/uploads', express.static('uploads'));

app.use(session({
  secret: 'secret', // Altere para uma chave secreta real
  resave: false,
  saveUninitialized: false, // Evita criação de sessões vazias
  cookie: { secure: false }, // Use 'true' se estiver usando HTTPS
}));

app.use("/", UsuarioRotas);
app.use("/", ProdutoRotas);
app.use("/", AutenticacaoRotas);
app.use("/", NovidadeRotas);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});