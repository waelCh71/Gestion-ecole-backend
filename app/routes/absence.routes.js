module.exports = (app) => {
    const absences = require('../controllers/absence.controller.js');


    app.post('/absences', absences.create);

    
    app.get('/absences', absences.findAll);

   
    app.get('/absences/:absenceId', absences.findOne);

    
    app.put('/absences/:absenceId', absences.update);

    
    app.delete('/absences/:absenceId', absences.delete);
}
