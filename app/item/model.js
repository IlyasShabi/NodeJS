let mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate');
    mongooseSchema = mongoose.Schema;
let schema = new mongoose.Schema({
    type: {type: String},
    name: { type: String },
    level : {type: mongooseSchema.Types.ObjectId, ref: 'Level'},
    creationDate :{type: Date, default: Date.now},
    icon: {},
    relations: {},
    Organizations: {},
    Initiatives: [],
    Customers: {},
    Products: {}
});

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Item', schema);