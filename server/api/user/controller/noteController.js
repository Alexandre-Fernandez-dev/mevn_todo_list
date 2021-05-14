const User = require("../model/User");
const Note = require("../model/Note");

exports.insertNote = async (req, res) => {
    try {
        let isUser = await User.find({ email: req.userData.email })
        if (isUser.length == 0) {
            return res.status(409).json({
                message: "Invalid user"
            });
        }
        const note = new Note({
            useremail: req.userData.email,
            title: req.body.title,
            content: req.body.content
        });
        let data = await note.save();
        res.status(201).json({ data });
    } catch (err) {
        res.status(400).json({ err: err });
    }
};

exports.updateNote = async (req, res) => {
    try {
        let isUser = await User.find({ email: req.userData.email })
        if (isUser.length == 0) {
            return res.status(409).json({
                message: "Invalid user"
            });
        }
        let note = await Note.findOne({ _id: req.params.id });
        if (req.userData.email != note.useremail) {
            return res.status(409).json({
                message: "Invalid user"
            });
        }
        note.title = req.body.title;
        note.content = req.body.content;
        let data = await note.save();
        res.status(201).json({ data });
    } catch (err) {
        console.log(err);
        res.status(400).json({ err: err });
    }
};

exports.listNotes = async (req, res) => {
    try {
        let data = await Note.find({ useremail: req.userData.email });
        res.status(201).json(data);
    } catch(err) {
        res.status(400).json({ err: err });
    }
}

exports.getNote = async (req, res) => {
    try {
        let data = await Note.findById(req.params.id);
        res.status(201).json(data);
    } catch(err) {
        res.status(400).json({ err: err });
    }
}

exports.deleteNote = async (req, res) => {
    try {
        let data = await Note.deleteOne({ _id: req.params.id });
        res.status(201).json({ data });
    } catch(err) {
        res.status(400).json({ err: err });
    }
}