import express from "express";
import { getMyPoke, getMyTeam, registerPoke } from "../controllers/pokeController.js";

const router = express.Router();

router.post("/registerPoke", registerPoke);
router.post("/getMyPoke", getMyPoke);
router.post("/getMyTeam", getMyTeam);

export default router;