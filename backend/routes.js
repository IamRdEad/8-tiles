import express from "express";
import {  undoMove, makeMove, newGame, getHint } from "./controller.js";

const router = express.Router();

router.post("/undo", undoMove);
router.post("/move", makeMove);
router.get("/new", newGame);
router.get("/hint", getHint);


export default router;