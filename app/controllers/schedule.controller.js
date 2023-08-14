const Emploi = require('../models/schedule.model.js');

// Create and Save a new emploi
exports.create = (req, res) => {

    // Create an emploi
    const emploi = new Emploi({
        nom: req.body.nom || "emploi du temps "+req.body.classe, 
        
        idClasse : req.body.idClasse,
        mediaLink : req.body.mediaLink
    });

    // Save emploi in the database
    emploi.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the emploi."
        });
    });
};

// Retrieve and return all emploi from the database.
exports.findAll = (req, res) => {
    Emploi.find()
    .then(emplois => {
        res.send(emplois);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving emploi."
        });
    });
};

// Find a single emploi with a emploiId
exports.findOne = (req, res) => {
    Emploi.findById(req.params.emploiId)
    .then(emploi => {
        if(!emploi) {
            return res.status(404).send({
                message: "emploi not found with id " + req.params.emploiId
            });            
        }
        res.send(emploi);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "emploi not found with id " + req.params.emploiId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving emploi with id " + req.params.emploiId
        });
    });
};

// Update an emploi identified by the emploiId in the request
exports.update = (req, res) => {

    // Find emploi and update it with the request body
    Emploi.findByIdAndUpdate(req.params.emploiId, {
        nom: req.body.nom || "emploi du temps "+req.body.classe, 
        
        idClasse : req.body.idClasse,
        mediaLink : req.body.mediaLink
    }, {new: true})
    .then(emploi => {
        if(!emploi) {
            return res.status(404).send({
                message: "emploi not found with id " + req.params.emploiId
            });
        }
        res.send(emploi);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "emploi not found with id " + req.params.emploiId
            });                
        }
        return res.status(500).send({
            message: "Error updating emploi with id " + req.params.emploiId
        });
    });
};

// Delete an emploi with the specified emploiId in the request
exports.delete = (req, res) => {
    Emploi.findByIdAndRemove(req.params.emploiId)
    .then(emploi => {
        if(!emploi) {
            return res.status(404).send({
                message: "emploi not found with id " + req.params.emploiId
            });
        }
        res.send({message: "emploi deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "emploi not found with id " + req.params.emploiId
            });                
        }
        return res.status(500).send({
            message: "Could not delete emploi with id " + req.params.emploiId
        });
    });
};
