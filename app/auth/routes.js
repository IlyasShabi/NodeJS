let to = require('await-to-js').default,
    Response = require('../../helpers/response'),
    ctrl = require('./ctrl');

module.exports = [{
    path: '/api/login',
    method: 'POST',
    require: {
        token: false
    },
    handler: async (req, res) => {
        const [err, data] = await to(ctrl.login(req.body));
        return Response.build(res, [err, data], [err, 200]);
    }
},
{
    path: '/api/auth/signup',
    method: 'POST',
    require: {
        token: false
    },
    handler: async (req, res) => {
        const [err, data] = await to(ctrl.signup(req.body));
        return Response.build(res, [err, data], [err, 200]);
    }
}
];