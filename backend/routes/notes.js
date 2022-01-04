const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note');


//----------------------------fetching notes----------------------------//

router.get('/fetchnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error occured");
    }
})


//---------------------------adding notes------------------------------//

router.post('/addnote', fetchuser, [
    body('title', 'title must be atleast 3 characters').isLength({ min: 3 }),
    body('description', 'description must be atleast 4 characters').isLength({ min: 4 }),

], async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })

        const saveNote = await note.save()
        res.json(saveNote)

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error occured");
    }
})

//---------------------------Updating notes------------------------------//

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;

    try {
        const newNote = {};
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }

        let note = await Note.findById(req.params.id)

        if (!note) {
            return res.status(401).send("Not found")
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Access denied");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
        
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error occured");
    }
    
})


//---------------------------Deleting notes------------------------------//

router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
        let note = await Note.findById(req.params.id)

        if (!note) {
            return res.status(401).send("Not found")
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Access denied");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Deleted": "Note has been deleted successfully", note: note });
        
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error occured");
    }
    
})


module.exports = router
