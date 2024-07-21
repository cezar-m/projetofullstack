import express from "express";
import {
	getNovidade,
	getNovidadePorId,
	addNovidade,
	deleteNovidade,
	updateNovidade
} from "../controllers/Novidades.js";

const router = express.Router();

router.get("/novidades", getNovidade);
router.get("/novidades/:id", getNovidadePorId);
router.post("/novidades", addNovidade);
router.put("/novidades/:id", updateNovidade);
router.delete("/novidades/:id", deleteNovidade);

export default router