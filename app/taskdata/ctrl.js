let _ = require('underscore'),
    mongoose = require('mongoose'),
    dao = new (require('./dao'))(),
    taskdata = mongoose.model('taskdata')
    utils = require('../../helpers/utils');


    module.exports.paginate = (q, levelId, page, limit) => {
        let query = { level: levelId};
        if (q) {
            let regexString = utils.buildSearchRegex(q);
            query = _.extend(query, {
                name: new RegExp(regexString, 'ig')
            })
        }
        return dao.paginateItems(query, page, limit);
    }

module.exports.create = (data) => {
    let task = new taskdata(data);
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
