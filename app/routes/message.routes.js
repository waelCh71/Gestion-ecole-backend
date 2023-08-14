module.exports = (app) => {
    const messages = require('../controllers/message.controller.js');


    app.post('/messages', messages.create);

    
    app.get('/messages', messages.findAll);

   
    app.get('/messages/:messageId', messages.findOne);

    
    app.put('/messages/:messageId', messages.update);

    
    app.delete('/messages/:messageId', messages.delete);
}
