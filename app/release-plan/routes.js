let to = require('await-to-js').default,
    Response = require('../../helpers/response'),
    ctrl = require('./ctrl');
    dao = require('./dao');

module.exports = [
    {
        path: '/api/releaseplan/:page/:limit',
        method: 'POST',
        require: {
            token: false
        },
        handler: async (req, res) => {
            const [err, releaseplan] = await to(ctrl.paginate(req.body.query, req.params.page, req.params.limit));
            return Response.build(res, [err, releaseplan]);
        }
    },
    {
        path: '/api/releaseplan/:id',
        method: 'GET',
        require: {
            token: true
        },
        handler: async (req, res) => {
            const [err, releaseplan] = await to(ctrl.find(req.params.id));
            return Response.build(res, [err, releaseplan]);
        }
    },
    {
        path: '/api/releaseplan/',
        method: 'POST',
        require: {
            token: true
        },
        handler: async (req, res) => {
            const [err, releaseplan] = await to(ctrl.create(req.body));
            return Response.build(res, [err, releaseplan]);
        }
    },
    {
        path: '/api/releaseplan/:id',
        method: 'PUT',
        require: {
            token: true
        },
        handler: async (req, res) => {
            const [err, releaseplan] = await to(ctrl.update(req.params.id, req.body));
            return Response.build(res, [err, releaseplan]);
        }
    },
    {
        path: '/api/releaseplan/:id',
        method: 'DELETE',
        require: {
            token: true
        },
        handler: async (req, res) => {
            const [err, releaseplan] = await to(ctrl.delete(req.params.id));
            return Response.build(res, [err, releaseplan]);
        }
    }
];