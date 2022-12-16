const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");
 
// ROUTE1: Get loggedIn user Details Authenticate a User using: POST "/api/auth/getuser" .....Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });      // all notes have been fetched...we are using the fetchuser where user is in the req.user
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Internal server Error occured");
  }
});

// ROUTE2: Add a new note using: POST "/api/notes/addnote" .....Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 charecters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;     // destructuring of title, description, tag from the body
      // If there are errors, return bad request and the errors
      const errors = await validationResult(req); // errors return object
      if (!errors.isEmpty()) {
        // if errors.isEmpty() does not return true
        return res.status(400).json({ errors: errors.array() }); // using a validation make sure that if aal baal or empty input, app doesnot crash
      }
      const note = new Note({     // creating a new note where we are adding title, description, tag user id
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();  // new note is saved
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Internal server Error occured");
    }
  }
);

// ROUTE3: Add a new note using: UT "/api/notes/updatenote" .....Login required
router.put(
    "/updatenote/:id",
    fetchuser,
    async (req, res) => {
        try {
          const { title, description, tag } = req.body;
        // Create a newNote  object
        const newNote = {};
        if(title){newNote.title = title};  // if title is coming from the body then title of the newNote will be equal to title of the body
        if(description){newNote.description = description};  
        if(tag){newNote.tag = tag};  

        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);   // it returns the document by its respective id... here id is from this one "/updatenote/:id"
        if(!note){return res.status(404).send("Not Found")}   // if the note document does not even exist

        if(note.user.toString() !== req.user.id){        // here user is the object id of the selected note documnet...if !== then user is trying to acces the notes of other user
            return res.status(401).send("Not Allowed");
        }

        // now we have the note docuumnet and only the user is accesing it
        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})   // now note document is updated
        res.json({note});
            
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some Internal server Error occured");
        }
        
      
    });

// ROUTE4: delete a note using: DELETE "/api/notes/deletenote" .....Login required
router.delete(
    "/deletenote/:id",
    fetchuser,
    async (req, res) => {
        try {
        const { title, description, tag } = req.body;

        // Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);   // it returns the document by its respective id... here id is from this one "/updatenote/:id"
        if(!note){return res.status(404).send("Not Found")}   // if the note document does not even exist

        if(note.user.toString() !== req.user.id){        // here user is the object id of the selected note documnet...if !== then user is trying to acces the notes of other user
            return res.status(401).send("Not Allowed");
        }

        // now we have the note docuumnet and only the user is accesing it
        note = await Note.findByIdAndDelete(req.params.id)   // now note document is updated
        res.json({"Success": "The note has been deleted", note: note});           
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some Internal server Error occured");
        }
    });

module.exports = router;
