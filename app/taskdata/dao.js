let DAO = require('../core/dao'),
    mongoose = require('mongoose'),
    taskdata = mongoose.model('taskdata');
    item = mongoose.model('Item')
class taskdataDAO extends DAO {

    constructor() {
        super();
        this.model = taskdata;
    }

    
}

module.exports = taskdataDAO;