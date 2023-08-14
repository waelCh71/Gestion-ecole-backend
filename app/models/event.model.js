const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    nom: {
            type: String,
    },
    phone:String,
    prix:String,
    dateEvenement:String,
    description:String,
    mediaLink:String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', EventSchema);