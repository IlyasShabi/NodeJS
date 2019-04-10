let to = require('await-to-js').default,
    Response = require('../../helpers/response'),
    ctrl = require('./ctrl');
    dao = require('./dao');
    _ = require('underscore'),
    utils = require('../../helpers/utils');

module.exports = [/* {
    path: '/api/items/:levelId/:page/:limit',
    method: 'POST',
    require: {
        token: true
    },
    handler: async (req, res) => {
        const [err, levels] = await to(ctrl.paginate(req.body.query, req.params.levelId, req.params.page, req.params.limit));
        return Response.build(res, [err, levels]);
    }
}, */
{
    path: '/api/roadmapinstances',
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
    path: '/api/roadmapinstances',
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
    path: '/api/roadmapinstances/findorcreate/:id',
    method: 'GET',
    require: {
        token: true
    },
    handler: async (req, res) => {
        const [err, level] = await to(ctrl.findorcreate(req.params.id));
        return Response.build(res, [err, level], [500, 201]);
    }
},

{
    path: '/api/roadmapinstances/:id',
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
    path: '/api/roadmapinstances/:id',
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
    path: '/api/roadmapinstances/roadmap/:id',
    method: 'GET',
    require: {
        token: false
    },
    handler: async (req, res) => {
        const [err, level] = await to(ctrl.findbyRoadmap(req.params.id));
        return Response.build(res, [err, !level, level], [500, 404, 200]);
    }
},

{
    path: '/api/roadmapinstances/:id',
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