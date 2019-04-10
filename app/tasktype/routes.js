let to = require('await-to-js').default,
    Response = require('../../helpers/response'),
    ctrl = require('./ctrl');
    dao = require('./dao');

module.exports = [
    {
        path: '/api/tasktype/:page/:limit',
        method: 'POST',
        require: {
            token: false
        },
        handler: async (req, res) => {
            console.log('req.body', req.body)
            const [err, tasktype] = await to(ctrl.paginate(req.body.query, req.params.page, req.params.limit));
            return Response.build(res, [err, tasktype]);
        }
    },
    {
        path: '/api/tasktype/:id',
        method: 'GET',
        require: {
            token: true
        },
        handler: async (req, res) => {
            const [err, tasktype] = await to(ctrl.find(req.params.id));
            return Response.build(res, [err, tasktype]);
        }
    },
    {
        path: '/api/tasktype/',
        method: 'POST',
        require: {
            token: true
        },
        handler: async (req, res) => {
            const [err, tasktype] = await to(ctrl.create(req.body));
            return Response.build(res, [err, tasktype]);
        }
    },
    {
        path: '/api/tasktype/:id',
        method: 'PUT',
        require: {
            token: true
        },
        handler: async (req, res) => {
            const [err, tasktype] = await to(ctrl.update(req.params.id, req.body));
            return Response.build(res, [err, tasktype]);
        }
    },
    {
        path: '/api/tasktype/:id',
        method: 'DELETE',
        require: {
            token: true
        },
        handler: async (req, res) => {
            const [err, tasktype] = await to(ctrl.delete(req.params.id));
            return Response.build(res, [err, tasktype]);
        }
    }
];