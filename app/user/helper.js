let bcrypt = require('bcrypt-nodejs');

module.exports.generateHash = (data) => {
    return bcrypt.hashSync(data);
}

module.exports.compareHash = (data, hash) => {
    return bcrypt.compareSync(data, hash);
}