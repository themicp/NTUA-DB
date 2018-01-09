const express = require('express');
const config = require('./config.json');
const Vehicle = require('./controllers/Vehicle');
const Client = require('./controllers/Client');
const Store = require('./controllers/Store');
const Employee = require('./controllers/Employee');
const bodyParser = require('body-parser');

(async () => {
    const db = await require('./db')

    const app = express();

	app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
	app.use(bodyParser.json()); // for parsing application/json

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.get('/', (req, res) => {
        res.send('Hello world!');
    });

    new Vehicle(app.route('/vehicles/:vehicleId?'))
    new Client(app.route('/clients/:clientId?'))
    new Store(app.route('/stores/:storeId?'))
    new Employee(app.route('/employee/:employeeId?'))
	
    app.route('/stores/:storeId/vehicles/')
        .get((req, res) => {
            res.send('Show vehicles of store!');
        });

    app.listen(config.port);
    console.log('Express server listening on port ' + config.port + '..');
})()
