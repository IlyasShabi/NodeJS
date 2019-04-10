let to = require('await-to-js').default,
    Response = require('../../helpers/response'),
    ctrl = require('./ctrl');
    dao = require('./dao');
    _ = require('underscore'),
    utils = require('../../helpers/utils');

module.exports = [/* {
    path: '/api/items/:groupId/:page/:limit',
    method: 'POST',
    require: {
        token: true
    },
    handler: async (req, res) => {
        const [err, groups] = await to(ctrl.paginate(req.body.query, req.params.groupId, req.params.page, req.params.limit));
        return Response.build(res, [err, groups]);
    }
}, */
{
    path: '/api/group',
    method: 'GET',
    require: {
        token: false
    },
    handler: async (req, res) => {
        const [err, group] = await to(ctrl.findAll());
        return Response.build(res, [err, group]);
    }
},
{
    path: '/api/group/byroadmap/:id',
    method: 'GET',
    require: {
        token: false
    },
    handler: async (req, res) => {
        const [err, group] = await to(ctrl.findByRoadmap(req.params.id));
        return Response.build(res, [err, group]);
    }
},
{
    path: '/api/group',
    method: 'POST',
    require: {
        token: true
    },
    handler: async (req, res) => {
        const [err, group] = await to(ctrl.create(req.body));
        return Response.build(res, [err, group], [500, 201]);
    }
},

{
    path: '/api/group/:id',
    method: 'PUT',
    require: {
        token: true
    },
    handler: async (req, res) => {
        const [err, group] = await to(ctrl.update(req.params.id, req.body));
        return Response.build(res, [err, group]);
    }
},

{
    path: '/api/group/:id',
    method: 'GET',
    require: {
        token: false
    },
    handler: async (req, res) => {
        const [err, group] = await to(ctrl.findById(req.params.id));
        return Response.build(res, [err, !group, group], [500, 404, 200]);
    }
},
/* {
    path: '/api/roadmapinstances/roadmap/:id',
    method: 'GET',
    require: {
        token: false
    },
    handler: async (req, res) => {
        const [err, group] = await to(ctrl.findbyRoadmap(req.params.id));
        return Response.build(res, [err, !group, group], [500, 404, 200]);
    }
}, */

{
    path: '/api/group/:id',
    method: 'DELETE',
    require: {
        token: true
    },
    handler: async (req, res) => {
        const [err, group] = await to(ctrl.delete(req.params.id));
        return Response.build(res, [err, group]);
    }
}
];