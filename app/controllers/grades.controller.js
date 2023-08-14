const Note = require('../models/grades.model.js');

// Create and Save a new note
exports.create = (req, res) => {

    // Create a note
    const note = new Note({
        nom: req.body.nom || "Untitled ", 
        
        idStudent : req.body.idStudent,
        remarque : req.body.remarque,
        mediaLink : req.body.mediaLink
    });

    // Save note in the database
    note.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the note."
        });
    });
};

// Retrieve and return all note from the database.
exports.findAll = (req, res) => {
    Note.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Note.findById(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "note not found with id " + req.params.noteId
            });            
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {

    // Find note and update it with the request body
    Note.findByIdAndUpdate(req.params.noteId, {
        nom: req.body.nom || "Untitled ", 
        
        idStudent : req.body.idStudent,
        remarque : req.body.remarque,
        mediaLink : req.body.mediaLink
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "note not found with id " + req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "note not found with id " + req.params.noteId
            });
        }
        res.send({message: "note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    });
};
