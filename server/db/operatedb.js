var User = require('./model/user');
var Card = require('./model/card');
var mongoose = require('mongoose');
var bluebird = require('bluebird');
mongoose.Promise = bluebird;
var applyCard = function (mainUser ,minonUser,credit_line) {

    var mypromise = minonUser.save().exec();
    mypromise.then(function (res) {
        console.log("Inser User Res:"+ res);
        
    })
    .error (function (error){
        console.log("User Insert Error:" + error);
    });

    minonUser.save (function (err,res) {
         if (err) {
             console.log("User Insert Error:" + err);
         }
         else {
             console.log("Inser User Res:"+ res);

         }
         return res;
     });
    var main_Id,minor_Id;
    User.find ({'user_id' : mainUser.user_id}, function(err, res){
        if (err) {
            console.log("Find Error:" + err);
        }
        else {
            // main_Id = res[0].id;
            console.log("main_Id Res:" + main_Id);
        }
    });

    console.log("++++++ mytest Res:" + mytest[0]);
    // User.find ({'user_id' : minonUser.user_id}, function(err, res){
    //     if (err) {
    //         console.log("Find Error:" + err);
    //     }
    //     else {
    //         // minor_Id = res[0].id;
    //         console.log("minor_Id Res:" + minor_Id);
    //     }
    // });
    // var card = new Card (
    //     {
    //         card_num : '621024344423232',
    //         bank : '招商银行',
    //         type : 0,
    //         credit_line : credit_line,
    //         main_id : mongoose.SchemaTypes.ObjectId(main_Id),
    //         minor_id : minor_Id
    //     }
    // );
    // card.save (function(err,res) {
    //     if (err) {
    //         console.log("Card Insert Error:" + err);
    //     }
    //     else {
    //         console.log("Res:"+ res);
    //     }
    // });
};

exports.function = applyCard;