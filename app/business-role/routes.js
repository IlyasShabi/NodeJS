let to = require('await-to-js').default,
    Response = require('../../helpers/response'),
    ctrl = require('./ctrl');

module.exports = [{
    path: '/api/roles/:page/:limit',
    method: 'POST',
    require: {
        token: true
    },
    handler: async (req, res) => {
        const [err, roles] = await to(ctrl.paginate(req.body.query, req.params.page, req.params.limit));
        return Response.build(res, [err, roles]);
    }
},
{
    path: '/api/roles',
    method: 'GET',
    require: {
        token: false
    },
    handler: async (req, res) => {
        const [err, role] = await to(ctrl.findAll());
        return Response.build(res, [err, role]);
    }
},
{
    path: '/api/roles',
    method: 'POST',
    require: {
        token: true
    },
    handler: async (req, res) => {
        const [err, role] = await to(ctrl.create(req.body));
        return Response.build(res, [err, role], [500, 201]);
    }
},
{
    path: '/api/roles/:id',
    method: 'PUT',
    require: {
        token: true
    },
    handler: async (req, res) => {
        const [err, role] = await to(ctrl.update(req.params.id, req.body));
        return Response.build(res, [err, role]);
    }
},
{
    path: '/api/roles/:id',
    method: 'GET',
    require: {
        token: false
    },
    handler: async (req, res) => {
        const [err, role] = await to(ctrl.findById(req.params.id));
        return Response.build(res, [err, !role, role], [500, 404, 200]);
    }
},
{
    path: '/api/roles/:id',
    method: 'DELETE',
    require: {
        token: true
    },
    handler: async (req, res) => {
        const [err, role] = await to(ctrl.delete(req.params.id));
        return Response.build(res, [err, role]);
    }
}
];