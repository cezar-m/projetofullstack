import express from "express";
import {
	Login,
	Logar,
	Logout,
    RedefinirSenha,
	AtualizarSenha
} from "../controllers/Login.js";

const router = express.Router();

router.post("/login", Login);
router.get("/user", Logar)
router.delete("/logout", Logout);
router.get("/redefinirsenha/:email", RedefinirSenha);
router.put("/atualizarsenha/:email", AtualizarSenha);

export default router