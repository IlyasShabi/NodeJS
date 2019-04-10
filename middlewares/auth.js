let _ = require('underscore'),
    utils = require('../helpers/utils'),
    tokenHelper = require('../helpers/token'),
    UserDao = new (require('../app/user/dao'))(),
    Response = require('../helpers/response'),
    jwt = require('../helpers/jwt');

module.exports.checkAuth = async (req, res, next, routes) => {
    let route = _.findWhere(routes, { path: req.route.path, method: req.route.stack[0].method.toUpperCase() });
    // Sanitize User Inputs
    utils.sanitize(req.body);
    if (route.require && route.require.token) {
        const token = tokenHelper.extractTokenFromHeader(req) || tokenHelper.extractTokenFromQuery(req);
        if (!token) {
            return Response.build(res, [401], [401]);
        }
        try {
            let data = await jwt.verify(token);
            req._user = data.isSuperAdmin ? data : await UserDao.findById(data._id);
            return next();
        } catch (e) {
            return Response.build(res, [401], [401]);
        }
    } else {
        return next();
    }
}
