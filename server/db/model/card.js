var mongoose = require('../connectdb'),
Schema = mongoose.Schema;
var User = require('./user');

var CardSchema = new Schema ({
    card_num : {type : Number,index: true},
    card_thumb : {type : String},
    bank : {type : String},
    type  : {type : Number},
    cvn2  : {type : Number},
    expiry_date : {type : Date},
    single_line : {type : Number},
    credit_line : {type : Number},
    quota_used : {type : Number},
    main_id : {type : mongoose.SchemaTypes.ObjectId, ref:'User'},
    minor_id : {type : mongoose.SchemaTypes.ObjectId, ref:'User'}
});

module.exports = mongoose.model('Card',CardSchema);