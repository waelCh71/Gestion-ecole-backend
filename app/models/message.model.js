const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    nom:String,
    
    email: String,
    subject:String,
    messageText: String,
    idSender:String,
    etat:String
}, {
    timestamps: true
});

module.exports = mongoose.model('Message', MessageSchema);