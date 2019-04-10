let Response = require('../../helpers/response'),
    to = require('await-to-js').default,
    ctrl = require('./ctrl');
    
module.exports = [{
    path: '/api/files',
    method: 'POST',
    require: {
        token: false
    },
    handler: async (req, res) => {
        const file = await ctrl.upload(req);
        return Response.build(res, [null, file], [500, 200]);
    }
}, {
    path: '/api/files/:filename/:id',
    method: 'GET',
    require: {
        token: false
    },
    handler: async (req, res) => {
        res.attachment(req.params.filename);
        const [err, file] = await to(ctrl.read(req.params.id));
        return Response.build(res, [err, file]);
    }
}, {
    path: '/api/files/:id',
    method: 'DELETE',
    require: {
        token: false
    },
    handler: async (req, res) => {
        const [err, file] = await to(ctrl.unlink(req.params.id));
        return Response.build(res, [err, file]);
    }
}];