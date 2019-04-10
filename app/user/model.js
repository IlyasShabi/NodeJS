let mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    helper = require('./helper');
    mongooseSchema = mongoose.Schema;

let schema = new mongoose.Schema({
    firstName: String,
    familyName: String,
    userName: { type: String },
    email: { type: String, unique: true },
    password: String,
    active: {type:Boolean, default: true},
    role: String,
    rights: {},
    businessRole:{type: mongooseSchema.Types.ObjectId, ref: 'BusinessRole'},
    initiatives:  [{type: mongooseSchema.Types.ObjectId, ref: 'Item'}],
    defaultLanguage: String,
    releasePlan: { type: Boolean},
    roadMap: { type: Boolean},
    entities: {}
});

// generating a hash
schema.methods.generateHash = (password) => {
    return helper.generateHash(password);
};

// checking if password is valid
schema.methods.validPassword = function(password)  {
    return helper.compareHash(password, this.password);
};

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', schema);