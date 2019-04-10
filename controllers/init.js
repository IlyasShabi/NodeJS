let _ = require('underscore'),
    mongoose = require('mongoose'),
    ConfigSchema = new mongoose.Schema({
        config : {}
    });
    

module.exports = {
    config: () => {
        let Config = mongoose.model('Config', ConfigSchema),
            data = require('../config/settings');
        return new Promise((resolve, reject) => {
            Config.findOne((err, config) => {
                if (err) {
                    return reject(err);
                }
                if (!config) {
                    new Config({ config: data }).save((err) => {
                        if (!err) {
                            global.CONFIG = data;
                            resolve(null);
                        } else {
                            reject(err);
                        }
                    });
                } else {
                    var conf = config.toObject().config;
                    _.each(data, (value, key) => {
    
                        if (!conf.hasOwnProperty(key)) {
                            conf[key] = value;
                        }
                    })
                    config.config = conf;
                    config.save((err) => {
                        if (!err) {
                            global.CONFIG = config.config;
                            resolve(null);
                        } else {
                            reject(err);
                        }
                    });
                }
            })
        })
    },

    unitTest:  () => {
        var fs = require('fs');
        var exec = require('child_process').exec;
        exec("mocha -R spec test/spec.js", (error, stdout, stderr) => {
            if (error) {
                console.log(error);
            } else {
                fs.writeFile("test/unit_test_result.txt", stdout.replace(/\n/g, '\r\n'), (err) => {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("Test File is Generated");
                });
            }
        });
    }
}
