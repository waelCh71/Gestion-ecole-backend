const Demande = require('../models/paperDemand.model.js');

// Create and Save a new demande
exports.create = (req, res) => {

    // Create a demande
    const demande = new Demande({ 
        
        idParent : req.body.idParent,
        idStudent : req.body.idStudent,
        dateDemende : req.body.dateDemende,
        type : req.body.type,
        etatActuelle : req.body.etatActuelle,
        remarque : req.body.remarque,
    });

    // Save demande in the database
    demande.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the demande."
        });
    });
};

// Retrieve and return all demandes from the database.
exports.findAll = (req, res) => {
    Demande.find()
    .then(demandes => {
        res.send(demandes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving demands."
        });
    });
};

// Find a single demande with a demandeId
exports.findOne = (req, res) => {
    Demande.findById(req.params.demandeId)
    .then(demande => {
        if(!demande) {
            return res.status(404).send({
                message: "demande not found with id " + req.params.demandeId
            });            
        }
        res.send(demande);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "demande not found with id " + req.params.demandeId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving demande with id " + req.params.demandeId
        });
    });
};

// Update a demande identified by the demandeId in the request
exports.update = (req, res) => {

    // Find demande and update it with the request body
    Demande.findByIdAndUpdate(req.params.demandeId, {

        idParent : req.body.idParent,
        idStudent : req.body.idStudent,
        dateDemende : req.body.dateDemende,
        type : req.body.type,
        etatActuelle : req.body.etatActuelle,
        remarque : req.body.remarque,

    }, {new: true})
    .then(demande => {
        if(!demande) {
            return res.status(404).send({
                message: "demande not found with id " + req.params.demandeId
            });
        }
        res.send(demande);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "demande not found with id " + req.params.demandeId
            });                
        }
        return res.status(500).send({
            message: "Error updating demande with id " + req.params.demandeId
        });
    });
};

// Delete a demande with the specified demandeId in the request
exports.delete = (req, res) => {
    Demande.findByIdAndRemove(req.params.demandeId)
    .then(demande => {
        if(!demande) {
            return res.status(404).send({
                message: "demande not found with id " + req.params.demandeId
            });
        }
        res.send({message: "demande deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "demande not found with id " + req.params.demandeId
            });                
        }
        return res.status(500).send({
            message: "Could not delete demande with id " + req.params.demandeId
        });
    });
};
