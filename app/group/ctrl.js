let _ = require('underscore'),
    mongoose = require('mongoose'),
    dao = new (require('./dao'))(),
    group = mongoose.model('group'),
    utils = require('../../helpers/utils');

module.exports.paginate = (q, levelId, page, limit) => {
    let query = { level: levelId};
    if (q) {
        let regexString = utils.buildSearchRegex(q);
        query = _.extend(query, {
            name: new RegExp(regexString, 'ig')
        })
    }
    return dao.paginate(query, page, limit);
}

module.exports.findById = (id) => {
    return dao.findById(id);
}

module.exports.finByName = (passedName) =>{
    return dao.findOne({name: passedName});
}

module.exports.create = (data) => {
    let task = new group(data);
    return dao.save(task);
};

module.exports.update = (id, data) => {
    return dao.update(id, data);
}

module.exports.delete = (id) => {
    return dao.delete(id);
}

module.exports.findAll = () =>{
    return dao.findAll();
}
module.exports.findByRoadmap = async (id) =>{
    let query = {roadmapinstance:id};
    return  dao.find(query); 
    
}


