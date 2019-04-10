let DAO = require('../core/dao'),
    mongoose = require('mongoose'),
    Level = mongoose.model('Level');

class LevelDAO extends DAO {    

    constructor() {
        super();
        this.model = Level;
    }
    findBySection(section) {
        return this.model.find({
            section
        },[] ,{
            sort:{
                order: 1
            }
        }).lean();
    }
    findLevelsAndItemsBySection(sections) {
        return this.model.find({'section': { $in: sections } }).populate('items').lean();
    }
    findBySecId(section, id){
        this.model.find({_id:id, })
    }
}

module.exports = LevelDAO;