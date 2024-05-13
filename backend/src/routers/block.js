import express from "express";
import blockController from "../controllers/blockController.js";

const router = express.Router();

router.post("/block", blockController.blockAccount);

router.get("/blocking/:user/:block", blockController.getIfIBlockThisAccount);

router.delete("/unblock", blockController.unBlockAccount);

export default router;