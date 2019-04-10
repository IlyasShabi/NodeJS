let to = require('await-to-js').default,
    Response = require('../../helpers/response'),
    ctrl = require('./ctrl');
    dao = require('./dao');

module.exports = [
    {
        path: '/api/roadmap/:page/:limit',
        method: 'POST',
        require: {
            token: false
        },
        handler: async (req, res) => {
            //console.log('req.body', req.body)
            const [err, roadmap] = await to(ctrl.paginate(req.body.query, req.params.page, req.params.limit));
            return Response.build(res, [err, roadmap]);
        }
    },
    {
        path: '/api/roadmap/:id',
        method: 'GET',
        require: {
            token: false
        },
        handler: async (req, res) => {
            const [err, roadmap] = await to(ctrl.find(req.params.id));
            return Response.build(res, [err, roadmap]);
        }
    },
    {
        path: '/api/roadmap',
        method: 'GET',
        require: {
            token: true

        },
        handler: async (req, res) => {
            const [err, roadmaps] = await to(ctrl.findAllRoadmaps());
            return Response.build(res, [err, roadmaps]);
        }
    },
    {
        path: '/api/roadmap/',
        method: 'POST',
        require: {
            token: true
        },
        handler: async (req, res) => {
            const [err, roadmap] = await to(ctrl.create(req.body));
            return Response.build(res, [err, roadmap]);
        }
    },
    {
        path: '/api/roadmap/:id',
        method: 'PUT',
        require: {
            token: true
        },
        handler: async (req, res) => {
            const [err, roadmap] = await to(ctrl.update(req.params.id, req.body));
            return Response.build(res, [err, roadmap]);
        }
    },
    {
        path: '/api/roadmap/:id',
        method: 'DELETE',
        require: {
            token: true
        },
        handler: async (req, res) => {
            const [err, roadmap] = await to(ctrl.delete(req.params.id));
            return Response.build(res, [err, roadmap]);
        }
    }
];