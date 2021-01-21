const mongoose = require('mongoose');
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
    lei :String
}, {collection: 'symbols'});

module.exports = mongoose.model('symbols', symbolSchema);