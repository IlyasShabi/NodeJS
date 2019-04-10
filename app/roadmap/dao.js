let DAO = require('../core/dao'),
    mongoose = require('mongoose'),
    roadmap = mongoose.model('roadmap');
class roadmapDAO extends DAO {

    constructor() {
        super();
        this.model = roadmap;
    }
    findById(id, lean = true, select = '-password') {
        let chain = roadmap.findById(id).populate('initiatives').populate('tasktypes').select(select);
        return lean ? chain.lean().exec() : chain.exec();
    }
    paginatee(query, page, limit) {
        return this.model.paginate(query, {
            select: '-password',
            populate:'tasktypes',
            page: page,
            limit: parseInt(limit),
            lean: true
        });
    }

    findAllRoadmaps(){
        return this.model.find().exec();
    }
}

module.exports = roadmapDAO;