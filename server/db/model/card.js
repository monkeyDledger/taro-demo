var mongoose = require('../connectdb'),
Schema = mongoose.Schema;

var CardSchema = new Schema ({
    card_num : {type : Number},
    bank : {type : String},
    type  : {type : Number},
    cvn2  : {type : Number},
    expiry_date : {type : Date},
    single_line : {type : Number},
    credit_line : {type : Number},
    quota_used : {type : Number}
});

module.exports = mongoose.model('Card',CardSchema);