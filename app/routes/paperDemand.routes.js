module.exports = (app) => {
    const demandes = require('../controllers/paperDemand.controller.js');


    app.post('/demandes', demandes.create);

    
    app.get('/demandes', demandes.findAll);

   
    app.get('/demandes/:demandeId', demandes.findOne);

    
    app.put('/demandes/:demandeId', demandes.update);

    
    app.delete('/demandes/:demandeId', demandes.delete);
}
