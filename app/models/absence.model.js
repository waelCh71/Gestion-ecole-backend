const mongoose = require('mongoose');

const AbsenceSchema = mongoose.Schema({
    idStudent:String,
    
    dateAbsence:String,

    timeAbsence:String,

    type:String,

    seance:String,

    remarque:String
}, {
    timestamps: true
});

module.exports = mongoose.model('Absence', AbsenceSchema);