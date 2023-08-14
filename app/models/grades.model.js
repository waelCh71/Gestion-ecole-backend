const mongoose = require('mongoose');

const NotesSchema = mongoose.Schema({
    nom: {
            type: String,
    },
    idStudent:String,
    remarque:String,
    mediaLink:String,  
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', NotesSchema);