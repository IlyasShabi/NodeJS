
let to = require('await-to-js').default,
    Response = require('../../helpers/response'),
    ctrl = require('./ctrl');
    dao = require('./dao');
    _ = require('underscore'),
    utils = require('../../helpers/utils');

module.exports = [
   
    {
        path: '/api/taskdata/:page/:limit',
        method: 'POST',
        require: {
            token: false
        },
        handler: async (req, res) => {
            if (req.body.genre) {
            let genre = req.body.genre;
            let query = {};
            let q = req.body.query;
            let regexString = utils.buildSearchRegex(genre);
            query1 = _.extend(query, { "genre": new RegExp(regexString, 'ig') });            
            const [err, taskdata] = await to(ctrl.paginate({query1,q}, req.params.page, req.params.limit));
            return Response.build(res, [err, taskdata]);
            }
            
        }
    },

    {
        path: '/api/taskdata/:id',
        method: 'GET',
        require: {
            token: true
        },
        handler: async (req, res) => {
            const [err, taskdata] = await to(ctrl.find(req.params.id));
            return Response.build(res, [err, taskdata]);
        }
    },
    // To create task data
    {
        path: '/api/taskdata/',
        method: 'POST',
        require: {
            token: true
        },
        handler: async (req, res) => {
            req.body.genre = 'taskdata';
            const [err, taskdata] = await to(ctrl.create(req.body));
            return Response.build(res, [err, taskdata]);
        }
    },
    // To create Features data
    {
        path: '/api/featuresdata/',
        method: 'POST',
        require: {
            token: true
        },
        handler: async (req, res) => {
            req.body.genre = 'featuresdata';
            const [err, taskdata] = await to(ctrl.create(req.body));
            return Response.build(res, [err, taskdata]);
        }
    },
    {
        path: '/api/taskdata/:id',
        method: 'PUT',
        require: {
            token: true
        },
        handler: async (req, res) => {
            const [err, taskdata] = await to(ctrl.update(req.params.id, req.body));
            return Response.build(res, [err, taskdata]);
        }
    },
    {
        path: '/api/taskdata/:id',
        method: 'DELETE',
        require: {
            token: true
        },
        handler: async (req, res) => {
            const [err, taskdata] = await to(ctrl.delete(req.params.id));
            return Response.build(res, [err, taskdata]);
        }
    }
];