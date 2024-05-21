import { Router } from "express";
import { createNote, getNote, getNotes } from "../controllers/note.controller";

const router = Router();

router.get("/", getNotes);
router.get("/:noteId", getNote);
router.post("/", createNote);

export default router;
