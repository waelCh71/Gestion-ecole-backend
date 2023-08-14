const mongoose = require('mongoose');

const EmploiSchema = mongoose.Schema({
    nom: {
            type: String,
    },

    idClasse:String,
    mediaLink:String,  
}, {
    timestamps: true
});

module.exports = mongoose.model('Emploi', EmploiSchema);