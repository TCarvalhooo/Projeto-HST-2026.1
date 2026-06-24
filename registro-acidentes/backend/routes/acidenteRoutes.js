import express from "express";
import {
  criarAcidente,
  listarAcidentes,
  buscarAcidentePorId,
  atualizarAcidente,
  deletarAcidente,
} from "../controllers/acidenteController.js";

const router = express.Router();

router.post("/", criarAcidente);
router.get("/", listarAcidentes);
router.get("/:id", buscarAcidentePorId);
router.put("/:id", atualizarAcidente);
router.delete("/:id", deletarAcidente);

export default router;