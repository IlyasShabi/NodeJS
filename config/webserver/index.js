let express = require('express'),
    app = express(),
    _ = require('underscore'),
    Env = require('../env'),
    Init = require('../../controllers/init'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    helmet = require('helmet'),
    morgan = require('morgan');

app.use(bodyParser.json({ limit: '10mb' }))
    .use(bodyParser.json({ type: 'application/vnd.api+json' }))
    .use(bodyParser.urlencoded({ extended: true }))
    .use(methodOverride('X-HTTP-Method-Override'))
    .use(helmet())
    .use(morgan('tiny'));

const startApp = async (modules) => {
    try {
        await Init.config();

        Env.setGlobal();

        _.each(modules, (module) => {
            try {
                require(`../../app/${module}/model`);
            } catch (e) {
                if(e.code !== 'MODULE_NOT_FOUND') throw e; 
            }
            require(`../../app/${module}`)(app);
        })

        let router = express.Router();

        router.use((req, res, next) => {
            next();
        });

        let port = global.CONFIG.server.node.port || 4000;
        app.listen(port);
        console.log('App on port ' + port);

    } catch (e) {
        console.log(e);
        process.exit(1);
    }
}

console.log = (...vars) => {
    if(process.env.NODE_ENV === 'production'){
        if(vars && vars.length && vars[0].toUpperCase() === 'PROD'){
            console.info(...vars);
        }
    } else {
        console.info(...vars);
    }
};

module.exports.start = startApp;
