module.exports = (modules) => {
    let mongoose = require('mongoose'),
        _ = require('underscore'),
        Database = require(__dirname + "/../config/database");

    Database.start(mongoose);

    let schemas = {};
    _.each(modules, (module) => {
        try {
            require(`${__dirname}/../app/${module}/model`);
            schemas[module] = mongoose.model('User');
        } catch (e) {
            if(e.code !== 'MODULE_NOT_FOUND') throw e; 
        }
    })
    return schemas;
}

