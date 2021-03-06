const express = require('express');
const morgan = require('morgan');

//initializations
const app = express();

//settings, buscamos un puerto y sino encuentra coloca el 4000
app.set('port', process.env.PORT || 4000);

//middleware
app.use(morgan('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//routes es como las rutas yaml
app.use('/evento',require('./routes/evento.js'));
app.use('/asistencia',require('./routes/asistencia.js'));
app.use('/imagen',require('./routes/imagen.js'));

//starting server
app.listen(app.get('port'),() =>{
    console.log("Server on port",app.get('port'));
})
