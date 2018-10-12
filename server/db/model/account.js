var mongoose = require('../connectdb'),
Schema = mongoose.Schema;
var Card = require('./card');

var AccountSchema = new Schema ({
    account_id : {type : String,index: true},
    time : {type : String},
    money : {type : Number},
    merchant : {type : String},
    merchant_id : {type : String},
    pos_id : {type : String},
    detail : {type : String},
    type : {type : String},
    consum_card : {type : mongoose.SchemaTypes.ObjectId, ref:'Card'},
    owner_card : {type : mongoose.SchemaTypes.ObjectId, ref:'Card'},
    comment : {type : Number}
});

module.exports = mongoose.model('Account',AccountSchema);