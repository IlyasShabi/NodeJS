let DAO = require('../core/dao'),
    mongoose = require('mongoose'),
    releaseplan = mongoose.model('release-plan');
class releaseplanDAO extends DAO {

    constructor() {
        super();
        this.model = releaseplan;
    }
    findById(id, lean = true, select = '-password') {
        let chain = releaseplan.findById(id).populate('initiatives').populate('taskdata').select(select);
        return lean ? chain.lean().exec() : chain.exec();
    }
    paginatee(query, page, limit) {
        return this.model.paginate(query, {
            select: '-password',
            populate:'taskdata',
            page: page,
            limit: parseInt(limit),
            lean: true
        });
    }
}

module.exports = releaseplanDAO;