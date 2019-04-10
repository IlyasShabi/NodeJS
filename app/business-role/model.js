let mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate');
    mongooseSchema = mongoose.Schema;
let schema = new mongoose.Schema({
    name: { type: String },
    rights: {},
    initiatives: [{type: mongooseSchema.Types.ObjectId, ref: 'Item'}],
    releasePlan: { type: Boolean},
    roadMap: { type: Boolean}
});

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('BusinessRole', schema);