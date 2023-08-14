module.exports = (app) => {
    const classes = require('../controllers/classe.controller.js');


    app.post('/classes', classes.create);

    
    app.get('/classes', classes.findAll);

   
    app.get('/classes/:classeId', classes.findOne);

    
    app.put('/classes/:classeId', classes.update);

    
    app.delete('/classes/:classeId', classes.delete);
}
