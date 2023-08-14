const Message = require('../models/message.model.js');

// Create and Save a new message
exports.create = (req, res) => {

    // Create a message
    const message = new Message({
        nom: req.body.nom , 
        email : req.body.email,
        subject: req.body.subject , 
        messageText: req.body.messageText,
        idSender: req.body.idSender,
        etat: req.body.etat,
    });

    // Save message in the database
    message.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the message."
        });
    });
};

// Retrieve and return all messages from the database.
exports.findAll = (req, res) => {
    Message.find()
    .then(messages => {
        res.send(messages);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving messages."
        });
    });
};

// Find a single message with a messageId
exports.findOne = (req, res) => {
    Message.findById(req.params.messageId)
    .then(message => {
        if(!message) {
            return res.status(404).send({
                message: "message not found with id " + req.params.messageId
            });            
        }
        res.send(message);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "message not found with id " + req.params.messageId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving messageId with id " + req.params.messageId
        });
    });
};

// Update a message identified by the messageId in the request
exports.update = (req, res) => {

    // Find message and update it with the request body
    Message.findByIdAndUpdate(req.params.messageId, {
        nom: req.body.nom , 
        email : req.body.email,
        subject: req.body.subject , 
        messageText: req.body.messageText,
        idSender: req.body.idSender,
        etat: req.body.etat,
    }, {new: true})
    .then(message => {
        if(!message) {
            return res.status(404).send({
                message: "message not found with id " + req.params.messageId
            });
        }
        res.send(message);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "message not found with id " + req.params.messageId
            });                
        }
        return res.status(500).send({
            message: "Error updating message with id " + req.params.messageId
        });
    });
};

// Delete a message with the specified messageId in the request
exports.delete = (req, res) => {
    Message.findByIdAndRemove(req.params.messageId)
    .then(message => {
        if(!message) {
            return res.status(404).send({
                message: "message not found with id " + req.params.messageId
            });
        }
        res.send({message: "message deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "message not found with id " + req.params.messageId
            });                
        }
        return res.status(500).send({
            message: "Could not delete message with id " + req.params.messageId
        });
    });
};
