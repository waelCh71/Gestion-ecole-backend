const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    nom: {
            type: String,
    },
    prenom: {
        type: String,
},
    email: {
            type: String,
            unique: [true, 'The email is unique']    
    },

    phone:String,
    idClasse:String,
    idParent:String,
    numInscription:String,
    dateDeNaissance:String,
    dateInscription:String,
    etatActuelle:String,
    remarque:String,
    password: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Student', StudentSchema);