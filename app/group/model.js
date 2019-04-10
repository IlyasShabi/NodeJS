let mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate');
    mongooseSchema = mongoose.Schema;

let schema = new mongoose.Schema({
    name: { type: String },
    color: { type: String },
    roadmapinstance :  {type: mongooseSchema.Types.ObjectId, ref: 'roadmap-instance'},
});

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('group', schema);