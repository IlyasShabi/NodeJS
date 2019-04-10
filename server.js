let mongoose = require('mongoose'),
    Database = require('./config/database'),
    App = require('./config/webserver'),
    modules = ['user', 'auth'];

const Server = {
    start : async () => await App.start(modules)
};

Database.start(mongoose);
Server.start();
