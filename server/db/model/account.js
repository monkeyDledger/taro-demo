var mongoose = require('../connectdb'),
Schema = mongoose.Schema;

var AccountSchema = new Schema ({
    time : {type : Date},
    money : {type : Number},
    merchant : {type : String},
    detail : {type : String},
    from_card : {type : Number},
    owner_card : {type : Number},
    comment : {type : Number}
});

module.exports = mongoose.model('Account',AccountSchema);