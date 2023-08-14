const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
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

    cin: {
        type: String,
        unique: [true, 'The cin is unique'] 
},

    role:String,

    password: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);