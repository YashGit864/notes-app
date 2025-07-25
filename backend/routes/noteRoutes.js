import express from "express";
import {createNote, getNotes, getNote, updateNote, deleteNote} from '../controllers/noteController.js'

const router = express.Router();

router.get("/", getNotes);
router.get("/:id", getNote);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;