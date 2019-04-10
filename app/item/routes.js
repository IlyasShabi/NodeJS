let to = require('await-to-js').default,
    Response = require('../../helpers/response'),
    ctrl = require('./ctrl');

module.exports = [{
    path: '/api/items/:levelId/:page/:limit',
    method: 'POST',
    require: {
        token: true
    },
    handler: async (req, res) => {
        const [err, levels] = await to(ctrl.paginate(req.body.query, req.params.levelId, req.params.page, req.params.limit));
        return Response.build(res, [err, levels]);
    }
},
{
    path: '/api/items',
    method: 'GET',
    require: {
        token: false
    },
    handler: async (req, res) => {
        const [err, level] = await to(ctrl.findAll());
        return Response.build(res, [err, level]);
    }
},
{
    path: '/api/items',
    method: 'POST',
    require: {
        token: true
    },
    handler: async (req, res) => {
        const [err, level] = await to(ctrl.create(req.body));
        return Response.build(res, [err, level], [500, 201]);
    }
},
{
    path: '/api/items/:id',
    method: 'PUT',
    require: {
        token: true
    },
    handler: async (req, res) => {
        const [err, level] = await to(ctrl.update(req.params.id, req.body));
        return Response.build(res, [err, level]);
    }
},

{
    path: '/api/items/:id',
    method: 'GET',
    require: {
        token: false
    },
    handler: async (req, res) => {
        const [err, level] = await to(ctrl.findById(req.params.id));
        return Response.build(res, [err, !level, level], [500, 404, 200]);
    }
},
{
    path: '/api/items/:id',
    method: 'DELETE',
    require: {
        token: true
    },
    handler: async (req, res) => {
        const [err, level] = await to(ctrl.delete(req.params.id));
        return Response.build(res, [err, level]);
    }
}
];