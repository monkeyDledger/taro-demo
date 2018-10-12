var mongoose = require('../connectdb'),
Schema = mongoose.Schema;

var UserSchema = new Schema ({
    user_id : {type : String,index: true},
    name : {type : String},
    nick_name : {type : String},
    phone  : {type : Number},
    thumb : {type : String},
    sex : {type : Number},
    role : {type : String},
    black_list : {type : Array}
});

module.exports = mongoose.model('User',UserSchema);