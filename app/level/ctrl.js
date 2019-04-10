let _ = require('underscore'),
    mongoose = require('mongoose'),
    dao = new (require('./dao'))(),
    Level = mongoose.model('Level'),
    utils = require('../../helpers/utils');

module.exports.paginate = (q, page, limit) => {
    let query = {};
    if (q) {
        let regexString = utils.buildSearchRegex(q);
        query = _.extend(query, {
            $or: [
                // { "firstName": new RegExp(regexString, 'ig') },
                // { "lastName": new RegExp(regexString, 'ig') }
            ]
        })
    }
    return dao.paginate(query, page, limit);
}
module.exports.findBySection = (section) => {
    return dao.findBySection(section);
}

module.exports.findLevelsAndItemsBySection = (sections) => {
    return dao.findLevelsAndItemsBySection(sections);
}

module.exports.findById = (id) => {
    return dao.findById(id);
}


module.exports.create = (data) => {
    let level = new Level(data);
    return dao.save(level);
}

module.exports.update = (id, data) => {
    return dao.update(id, data);
}

module.exports.delete = id => {
    return dao.delete(id);
} 

module.exports.getBySecAndId = (section, id) => {
    return dao.findBySecId(section, id);
}