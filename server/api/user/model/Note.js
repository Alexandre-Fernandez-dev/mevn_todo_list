const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const noteSchema = mongoose.Schema({
    useremail: {
        type: String,
        required: [true, "Missing user email"]
    },
    title: {
        type: String,
        required: [true, "Missing title"]
    },
    content: {
        type: String,
        required: [true, "Missing content"]
    }
});

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;