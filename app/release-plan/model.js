let mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate');

let schema = new mongoose.Schema({
    name: { type: String },
    initiatives: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item'}],
    releasedatas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'releasedatas'}],
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item'}],
});

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('release-plan', schema);