let DAO = require('../core/dao'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

class UserDAO extends DAO {

    constructor() {
        super();
        this.model = User;
    }
}

module.exports = UserDAO;