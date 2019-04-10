let mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate');

let schema = new mongoose.Schema({
    name: { type: String },
    initiatives: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item'}],
    tasktypes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tasktype'}],
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item'}],
});

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('roadmap', schema);