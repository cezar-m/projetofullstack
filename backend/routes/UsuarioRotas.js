import express from "express";
import {
	getUsuario,
	getUsuarioPorId,
	addUsuario, 
	updateUsuario, 
	deleteUsuario
} from "../controllers/Usuario.js";

const router = express.Router();

router.get("/usuarios", getUsuario);
router.get("/usuarios/:id", getUsuarioPorId);
router.post("/usuarios", addUsuario);
router.put("/usuarios/:id", updateUsuario);
router.delete("/usuarios/:id", deleteUsuario);

export default router