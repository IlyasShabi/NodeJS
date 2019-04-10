let _ = require('underscore'),
    mongoose = require('mongoose'),
    dao = new (require('./dao'))(),
    Role = mongoose.model('BusinessRole'),
    utils = require('../../helpers/utils');

module.exports.paginate = (q, page, limit) => {
    var query;
    if (q) {
        let regexString = utils.buildSearchRegex(q);
        query = { name: new RegExp(regexString, 'ig')};
    }
    return dao.paginateItems(query, page, limit);
}

module.exports.findById = (id) => {
    return dao.findById(id);
}

module.exports.create = (data) => {
    let role = new Role(data);
    return dao.save(role);
}

module.exports.update = (id, data) => {
    return dao.update(id, data);
}

module.exports.delete = (id) => {
    return dao.delete(id);
}

module.exports.findAll = () =>{
    return dao.findAll();
}