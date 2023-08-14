module.exports = (app) => {
    const emplois = require('../controllers/schedule.controller.js');


    app.post('/emplois', emplois.create);

    
    app.get('/emplois', emplois.findAll);

   
    app.get('/emplois/:emploiId', emplois.findOne);

    
    app.put('/emplois/:emploiId', emplois.update);

    
    app.delete('/emplois/:emploiId', emplois.delete);
}
