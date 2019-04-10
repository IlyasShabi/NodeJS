let DAO = require('../core/dao'),
    mongoose = require('mongoose'),
    group = mongoose.model('group');
class roadmapInstanceDAO extends DAO {

    constructor() {
        super();
        this.model = group;
    }

}

module.exports = roadmapInstanceDAO;

