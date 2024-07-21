import express from "express";
import upload from '../middleware/multerConfig.js';
import {
	getProduto,
	getProdutoPorId,
	addProduto, 
	updateProduto, 
	deleteProduto
} from "../controllers/Produto.js";


const router = express.Router();

router.get("/produtos", getProduto);
router.get("/produtos/:id", getProdutoPorId);
router.post("/produtos", addProduto);
router.put("/produtos/:id", upload.single('imagem'), updateProduto);
router.delete("/produtos/:id", deleteProduto);

export default router