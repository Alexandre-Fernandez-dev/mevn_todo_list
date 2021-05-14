const express = require("express");
const router = express.Router();
const auth = require("../../../config/auth");
const noteController = require("../controller/noteController");

router.get("/", auth, noteController.listNotes);
router.post("/insert", auth, noteController.insertNote);
router.get("/:id", auth, noteController.getNote);
router.post("/:id", auth, noteController.updateNote);
router.delete("/:id", auth, noteController.deleteNote);

module.exports = router;