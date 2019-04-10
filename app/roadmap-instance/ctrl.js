let _ = require('underscore'),
    mongoose = require('mongoose'),
    dao = new (require('./dao'))(),
    roadmapinstance = mongoose.model('roadmap-instance'),
    utils = require('../../helpers/utils');
    to = require('await-to-js').default;

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
    let task = new roadmapinstance(data);
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

module.exports.findorcreate = async (id) =>{
    let query = {roadmap:id};
    const [err, result] = await to(dao.find(query));
    if(result.length){
        return result;
    }else{
        let instance = new roadmapinstance({version: 0, roadmap: id});
        return dao.save(instance);
    }
}
