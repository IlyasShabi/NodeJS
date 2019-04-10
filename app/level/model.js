let mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate');

let schema = new mongoose.Schema({
    section: { type: String },
    name: { type: String },
    order: { type: Number },
    icon: {},
    creationDate :{type: Date,default: Date.now},
});

schema.plugin(mongoosePaginate);
schema.virtual('items',{
    ref: 'Item',
    localField: '_id',
    foreignField: 'level'
});

module.exports = mongoose.model('Level', schema);