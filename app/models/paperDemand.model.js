const mongoose = require('mongoose');

const DemandSchema = mongoose.Schema({

    idParent:String,
    idStudent:String,
    dateDemende:String,
    type:String,
    etatActuelle:String,
    remarque:String,
    
}, {
    timestamps: true
});

module.exports = mongoose.model('Demande', DemandSchema);