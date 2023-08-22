const Student = require('../models/student.model.js');

// Create and Save a new student
exports.create = (req, res) => {

    // Create a student
    const student = new Student({
        nom: req.body.nom || "Untitled student", 
        prenom: req.body.prenom ,
        email : req.body.email,
        phone : req.body.phone,
        idClasse : req.body.idClasse,
        idParent : req.body.idParent,
        numInscription : req.body.numInscription,
        dateDeNaissance: req.body.dateDeNaissance,
        dateInscription : req.body.dateInscription,
        etatActuelle : req.body.etatActuelle,
        remarque :  req.body.remarque,
        password : req.body.password
    });

    // Save student in the database
    student.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the student."
        });
    });
};

// Retrieve and return all student from the database.
exports.findAll = (req, res) => {
    Student.find()
    .then(students => {
        res.send(students);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving students."
        });
    });
};

// Find a single student with a studentId
exports.findOne = (req, res) => {
    Student.findById(req.params.studentId)
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "student not found with id " + req.params.studentId
            });            
        }
        res.send(student);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "student not found with id " + req.params.studentId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving student with id " + req.params.studentId
        });
    });
};

// Update a student identified by the studentId in the request
exports.update = (req, res) => {
    // Validate Request

    /*if(!req.body.username) {
        return res.status(400).send({
            message: "admin content can not be empty"
        });
    }*/

    // Find student and update it with the request body
    Student.findByIdAndUpdate(req.params.studentId, {
        nom: req.body.nom || "Untitled admin", 
        prenom : req.body.prenom,
        email : req.body.email,
        phone : req.body.phone,
        idClasse : req.body.idClasse,
        idParent : req.body.idParent,
        numInscription : req.body.numInscription,
        dateDeNaissance: req.body.dateDeNaissance,
        dateInscription : req.body.dateInscription,
        etatActuelle : req.body.etatActuelle,
        remarque :  req.body.remarque,
        password: req.body.password
    }, {new: true})
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "student not found with id " + req.params.studentId
            });
        }
        res.send(student);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "student not found with id " + req.params.studentId
            });                
        }
        return res.status(500).send({
            message: "Error updating student with id " + req.params.studentId
        });
    });
};

// Delete a student with the specified studentId in the request
exports.delete = (req, res) => {
    Student.findByIdAndRemove(req.params.studentId)
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "student not found with id " + req.params.studentId
            });
        }
        res.send({message: "student deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "student not found with id " + req.params.studentId
            });                
        }
        return res.status(500).send({
            message: "Could not delete student with id " + req.params.studentId
        });
    });
};
