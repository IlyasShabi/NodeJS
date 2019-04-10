let _ = require('underscore'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    dao = new (require('./dao'))(),
    helper = require('./helper'),
    utils = require('../../helpers/utils');

module.exports.paginate = (q, page, limit) => {
    let query = {};
    if (q) {
        let regexString = utils.buildSearchRegex(q);
        query = _.extend(query, {
            $or: [
                { "firstName": new RegExp(regexString, 'ig') },
                { "lastName": new RegExp(regexString, 'ig') },
                { "email": new RegExp(regexString, 'ig') },
                { "userName": new RegExp(regexString, 'ig') }
            ]
        })
    }
    return dao.paginate(query, page, limit);
}

module.exports.findById = (id) => {
    return dao.findById(id);
}

module.exports.create = (data) => {
    let user = new User(data);
    user.password = user.generateHash(data.password);
    return dao.save(user);
}

module.exports.update = (id, data) => {
    if (data.password) {
        data.password = helper.generateHash(data.password);
    }
    return dao.update(id, data);
}

module.exports.delete = (id) => {
    return dao.delete(id);
}