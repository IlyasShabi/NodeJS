let mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate');

let schema = new mongoose.Schema({
    name: { type: String },
    color: { type: String},
    fields: [{ type: mongoose.Schema.Types.ObjectId, ref: 'taskdata'}]
});

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('tasktype', schema);