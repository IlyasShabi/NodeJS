let _ = require('underscore'),
    UserDao = new (require('../user/dao'))(),
    helper = require('./helper'),
    jwt = require('../../helpers/jwt');

module.exports.login = async (data) => {
    if (helper.isSuperAdmin(data)) {
        const user = _.omit(global.CONFIG.superAdmin, 'password');
        let token = await jwt.sign(user);
        return { token: token, user: user };
    } else {
        const user = await UserDao.findOne({ $or: [{ email: data.email }, { userName: data.email }] }, false, null);
        if (!user) {
            throw 404;
        } else if (!user.validPassword(data.password)) {
            throw 401;
        } else {
            let token = await jwt.sign({ _id: user._id });
            return { token: token, user: _.omit(user, 'password') };
        }
    }
}

