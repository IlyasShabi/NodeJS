let mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate');

let schema = new mongoose.Schema({
    name: { type: String },
    type: { type: String},
    measure: {type: String},
    unit: {type: String},
    values : [],
    genre: { type: String, enum:["featuresdata","taskdata"] }
});

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('taskdata', schema);