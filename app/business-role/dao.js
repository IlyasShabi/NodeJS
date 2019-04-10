let DAO = require('../core/dao'),
    mongoose = require('mongoose'),
    Role = mongoose.model('BusinessRole');

class RoleDAO extends DAO {

    constructor() {
        super();
        this.model = Role;
    }
    paginateItems(query, page, limit) {
        
        return this.model.paginate(query, {
            page: page,
            limit: parseInt(limit),
            lean: true
        });
    }
    findAll(){
        return this.model.find().lean();
    }
}

module.exports = RoleDAO;