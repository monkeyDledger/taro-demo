var mongoose = require('../connectdb'),
Schema = mongoose.Schema;

var UserSchema = new Schema ({
    name : {type : String},
    nick_name : {type : String},
    phone  : {type : Number},
    thumb : {type : String},
    sex : {type : Number},
    family : {type : Array},
    card_list : {type : Array},
    black_list: {type : Array}
});

module.exports = mongoose.model('User',UserSchema);