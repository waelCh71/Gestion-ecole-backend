const Classe = require('../models/classe.model.js');

// Create and Save a new classe
exports.create = (req, res) => {

    // Create a classe
    const classe = new Classe({
        nom: req.body.nom, 
        
        description : req.body.description,
        
    });

    // Save classe in the database
    classe.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the class."
        });
    });
};

// Retrieve and return all classes from the database.
exports.findAll = (req, res) => {
    Classe.find()
    .then(classes => {
        res.send(classes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving classes."
        });
    });
};

// Find a single class with a classeId
exports.findOne = (req, res) => {
    Classe.findById(req.params.classeId)
    .then(classe => {
        if(!classe) {
            return res.status(404).send({
                message: "classe not found with id " + req.params.classeId
            });            
        }
        res.send(classe);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "classe not found with id " + req.params.classeId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving classe with id " + req.params.classeId
        });
    });
};

// Update a classe identified by the classeId in the request
exports.update = (req, res) => {

    // Find classe and update it with the request body
    Classe.findByIdAndUpdate(req.params.classeId, {
        nom: req.body.nom , 
        
        description : req.body.description,
       
    }, {new: true})
    .then(classe => {
        if(!classe) {
            return res.status(404).send({
                message: "classe not found with id " + req.params.classeId
            });
        }
        res.send(classe);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "classe not found with id " + req.params.classeId
            });                
        }
        return res.status(500).send({
            message: "Error updating classe with id " + req.params.classeId
        });
    });
};

// Delete a classe with the specified classeId in the request
exports.delete = (req, res) => {
    Classe.findByIdAndRemove(req.params.classeId)
    .then(classe => {
        if(!classe) {
            return res.status(404).send({
                message: "classe not found with id " + req.params.classeId
            });
        }
        res.send({message: "classe deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "classe not found with id " + req.params.classeId
            });                
        }
        return res.status(500).send({
            message: "Could not delete classe with id " + req.params.classeId
        });
    });
};
