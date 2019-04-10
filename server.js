let mongoose = require('mongoose'),
    Database = require('./config/database'),
    App = require('./config/webserver'),
    modules = ['user', 'auth', 'file', 'level', 'item', 'taskdata', 'tasktype', 'conf','roadmap', 'business-role', 'release-plan','roadmap-instance','group'];

const Server = {
    start : async () => await App.start(modules)
};

Database.start(mongoose);
Server.start();
