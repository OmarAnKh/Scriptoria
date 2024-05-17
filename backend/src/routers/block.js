import express from "express";
import blockController from "../controllers/blockController.js";
import authentication from "../middleware/authentication.js";

const router = express.Router();

router.post("/block", authentication, blockController.blockAccount);

router.get("/blocking/:user/:block", blockController.getIfIBlockThisAccount);

router.delete("/unblock", authentication, blockController.unBlockAccount);

export default router;