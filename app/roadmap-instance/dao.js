let DAO = require('../core/dao'),
    mongoose = require('mongoose'),
    roadmaps = mongoose.model('roadmap-instance');
class roadmapInstanceDAO extends DAO {

    constructor() {
        super();
        this.model = roadmaps;
    }

}

module.exports = roadmapInstanceDAO;

