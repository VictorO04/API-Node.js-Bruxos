import express from "express";
import {getAllBruxos, getBruxoById, createBruxo, deleteBruxo, updateBruxo} from "../controllers/bruxosController.js";

const router = express.Router();

router.get("/", getAllBruxos);
router.get("/id/:id", getBruxoById);
router.post("/", createBruxo);
router.put("/id/:id", updateBruxo);
router.delete("/id/:id", deleteBruxo);

export default router;