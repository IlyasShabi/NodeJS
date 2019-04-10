let mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate');
    mongooseSchema = mongoose.Schema;

let schema = new mongoose.Schema({
    version: { type: Number },
    roadmap :  {type: mongooseSchema.Types.ObjectId, ref: 'roadmap'},
});

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('roadmap-instance', schema);