let to = require('await-to-js').default,
    Response = require('../../helpers/response'),
    ctrl = require('./ctrl');

module.exports = [{
    path: '/api/users/:page/:limit',
    method: 'POST',
    require: {
        token: true
    },
    handler: async (req, res) => {
        const [err, users] = await to(ctrl.paginate(req.body.query, req.params.page, req.params.limit));
        return Response.build(res, [err, users]);
    }
},
{
    path: '/api/users',
    method: 'POST',
    require: {
        token: true
    },
    handler: async (req, res) => {
        console.log("======================");
        const [err, user] = await to(ctrl.create(req.body));
        return Response.build(res, [err, user], [500, 201]);
    }
},
{
    path: '/api/users/:id',
    method: 'PUT',
    require: {
        token: true
    },
    handler: async (req, res) => {
        const [err, user] = await to(ctrl.update(req.params.id, req.body));
        return Response.build(res, [err, user]);
    }
},
{
    path: '/api/users/:id',
    method: 'GET',
    require: {
        token: false
    },
    handler: async (req, res) => {
        const [err, user] = await to(ctrl.findById(req.params.id));
        return Response.build(res, [err, !user, user], [500, 404, 200]);
    }
},
{
    path: '/api/users/:id',
    method: 'DELETE',
    require: {
        token: true
    },
    handler: async (req, res) => {
        const [err, user] = await to(ctrl.delete(req.params.id));
        return Response.build(res, [err, user]);
    }
}
];