const Absence = require('../models/absence.model.js');

// Create and Save a new absence
exports.create = (req, res) => {
    
    const absence = new Absence({
        idStudent: req.body.idStudent , 
        dateAbsence: req.body.dateAbsence ,
        timeAbsence : req.body.timeAbsence,
        type: req.body.type,
        seance: req.body.seance,
        remarque: req.body.remarque,
    });

    // Save absence in the database
    absence.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the absence."
        });
    });
};

// Retrieve and return all absence from the database.
exports.findAll = (req, res) => {
    Absence.find()
    .then(absences => {
        res.send(absences);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving absence."
        });
    });
};

// Find a single absence with a absenceId
exports.findOne = (req, res) => {
    Absence.findById(req.params.absenceId)
    .then(absence => {
        if(!absence) {
            return res.status(404).send({
                message: "absence not found with id " + req.params.absenceId
            });            
        }
        res.send(absence);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "absence not found with id " + req.params.absenceId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving absence with id " + req.params.absenceId
        });
    });
};

// Update a absence identified by the absenceId in the request
exports.update = (req, res) => {
    
    Absence.findByIdAndUpdate(req.params.absenceId, {
        idStudent: req.body.idStudent , 
        dateAbsence: req.body.dateAbsence ,
        timeAbsence : req.body.timeAbsence,
        type: req.body.type,
        seance: req.body.seance,
        remarque: req.body.remarque,
    }, {new: true})
    .then(absence => {
        if(!absence) {
            return res.status(404).send({
                message: "absence not found with id " + req.params.absenceId
            });
        }
        res.send(absence);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "absence not found with id " + req.params.absenceId
            });                
        }
        return res.status(500).send({
            message: "Error updating absence with id " + req.params.absenceId
        });
    });
};

// Delete a absence with the specified absenceId in the request
exports.delete = (req, res) => {
    Absence.findByIdAndRemove(req.params.absenceId)
    .then(absence => {
        if(!absence) {
            return res.status(404).send({
                message: "absence not found with id " + req.params.absenceId
            });
        }
        res.send({message: "absence deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "absence not found with id " + req.params.absenceId
            });                
        }
        return res.status(500).send({
            message: "Could not delete absence with id " + req.params.absenceId
        });
    });
};
