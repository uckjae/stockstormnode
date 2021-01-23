const mongoose = require('mongoose');
const upsertMany = require('@meanie/mongoose-upsert-many');
mongoose.plugin(upsertMany)
const Schema = mongoose.Schema;

const symbolSchema = new Schema({
    symbol : String,
    exchange : String,
    exchangeSuffix :String,
    exchangeName :String,
    name :String,
    date : Date,
    type: String,
    iexId: String,
    region: String,
    currency: String,
    isEnabled :Boolean,
    figi: String,
    cik :String,
    lei :String,
    isUpdated : {type: Boolean, default: false}
}, {collection: 'symbols'},{
    upsertMany: {
        matchFields: ['field1','field2'],
        type: 'replaceOne',
        ensureModel: true
    }
});
symbolSchema.plugin(upsertMany)
module.exports = mongoose.model('symbols', symbolSchema);