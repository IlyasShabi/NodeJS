let DAO = require('../core/dao'),
    mongoose = require('mongoose'),
    Item = mongoose.model('Item');

class ItemDAO extends DAO {

    constructor() {
        super();
        this.model = Item;
    }
    paginateItems(query, page, limit) {
        return this.model.paginate(query, {
            page: page,
            limit: parseInt(limit),
            lean: true
        });
    }
}

module.exports = ItemDAO;