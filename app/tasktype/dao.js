let DAO = require('../core/dao'),
    mongoose = require('mongoose'),
    tasktype = mongoose.model('tasktype');
    item = mongoose.model('Item')
class tasktypeDAO extends DAO {

    constructor() {
        super();
        this.model = tasktype;
    }
    findById(id, lean = true, select = '-password') {
        let chain = this.model.findById(id).select(select).populate('fields','name');
        return lean ? chain.lean().exec() : chain.exec();
    }
    
}

module.exports = tasktypeDAO;