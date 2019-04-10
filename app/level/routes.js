let to = require('await-to-js').default,
    Response = require('../../helpers/response'),
    ctrl = require('./ctrl');

module.exports = [{
    path: '/api/:type/levels/:page/:limit',
    method: 'POST',
    require: {
        token: true
    },
    handler: async (req, res) => {
        const [err, levels] = await to(ctrl.paginate(req.body.query, req.params.page, req.params.limit));
        return Response.build(res, [err, levels]);
    }
},
{
    path: '/api/:type/levels',
    method: 'GET',
    require: {
        token: false
    },
    handler: async (req, res) => {
        const [err, level] = await to(ctrl.findBySection(req.params.type));
        return Response.build(res, [err, level]);
    }
},
{
    path: '/api/levelsAndItems',
    method: 'POST',
    require: {
        token: false
    },
    handler: async (req, res) => {
        console.log("here", req.body);
        const [err, levels] = await to(ctrl.findLevelsAndItemsBySection(req.body));
        console.log(levels);
        return Response.build(res, [err, levels]);
    }
},
{
    path: '/api/level',
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
    path: '/api/:type/level/:id',
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
    path: '/api/:type/level/:id',
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
    path: '/api/:type/level/:id',
    method: 'DELETE',
    require: {
        token: true
    },
    handler: async (req, res) => {
        const [err, level] = await to(ctrl.delete(req.params.id));
        return Response.build(res, [err, level]);
    }
},
{
    path: '/api/:type/level/:id',
    method: 'GET',
    require: {
        token: false
    },
    handler: async (req, res) => {
        const [err, level] = await to(ctrl.getBySecAndId(req.params.id));
        return Response.build(res, [err, level]);
    }
}
];