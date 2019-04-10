let _ = require('underscore'),
    mongoose = require('mongoose'),
    dao = new (require('./dao'))(),
    tasktype = mongoose.model('tasktype')
    utils = require('../../helpers/utils');


module.exports.paginate = (q,page,limit) => {
    let query = {};
    if (q) {
        console.log('if q')
        let regexString = utils.buildSearchRegex(q);
        query = _.extend(query, { "name": new RegExp(regexString, 'ig') })
                // { "lastName": new RegExp(regexString, 'ig') },
                // { "email": new RegExp(regexString, 'ig') },
                // { "userName": new RegExp(regexString, 'ig') })
    }
    console.log('query', query)
    return dao.paginate(query, page, limit);
}

module.exports.create = (data) => {
    let task = new tasktype(data);
    return dao.save(task);
}
module.exports.find = (id) => {
    return dao.findById(id);
}

module.exports.update = (id, data) => {
    return dao.update(id, data);
}

module.exports.delete = (id) => {
    return dao.delete(id);
}
