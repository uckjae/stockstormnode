const mongoose = require('mongoose');
const upsertMany = require('@meanie/mongoose-upsert-many');
mongoose.plugin(upsertMany);
const Schema = mongoose.Schema;

const symbolRefSchema = new Schema({
    symbol : String,
    ref : {type : Number, default : 0, required : true}
}, {collection: 'symbolRefCount'},{
    upsertMany: {
        matchFields: ['field1','field2'],
        type: 'replaceOne',
        ensureModel: true
    }
});
symbolRefSchema.plugin(upsertMany)
module.exports = mongoose.model('symbolRefCount', symbolRefSchema);