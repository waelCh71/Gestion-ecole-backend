const mongoose = require('mongoose');

const ClasseSchema = mongoose.Schema({
    nom: {
            type: String,
            
    },
    
    description:String,
    
}, {
    timestamps: true
});

module.exports = mongoose.model('Classe', ClasseSchema);