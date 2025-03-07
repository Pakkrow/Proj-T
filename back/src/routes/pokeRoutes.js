import express from "express";
import { getMyPoke, registerPoke } from "../controllers/pokeController.js";

const router = express.Router();

router.post("/registerPoke", registerPoke);
router.post("/getMyPoke", getMyPoke);

export default router;