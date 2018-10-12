var User = require('./model/user');
var Card = require('./model/card');
var mongoose = require('mongoose');
var bluebird = require('bluebird');
mongoose.Promise = bluebird;
var applyCard = function (mainUser ,minonUser,credit_line) {

    var account = new Account({
        account_id : randomstring.generate({
          length: 16,
          charset: '0123456789'
        }),
        time : dateutil.format(new Date(),'YYYY-MM-DD HH:mm:ss'),
        money : 200,
        merchant : '星巴克',
        merchant_id : randomstring.generate({
          length: 8,
          charset: '0123456789'
        }),
        pos_id : randomstring.generate({
          length: 12,
          charset: '0123456789'
        }),
        detail : "星冰乐",
        type : "餐饮酒水",
        consum_card :mongoose.Types.ObjectId('5bbf284a6a967e23874202f1'),
        owner_card : mongoose.Types.ObjectId('5bbf3bfe7453e50f604bdb7c')
      });
    
      account.save(function (err,result){
        res.send({code:1000,msg:"成功"});
      });



    minonUser.save((err,res) => {
        if (err) {
            console.log("User Insert Error:" + error);
        }
        return Promise.resolve (res);
    })
    .then((res) => {
        console.log("Inser User Res:"+ res);
        var main_Id,minor_Id;
        User.find ({'user_id' : mainUser.user_id}
        ).exec().then(function (res) {
            main_Id = res[0].id;
            console.log("main_Id Res:" + main_Id);
        },function (error) {
            console.log("Find Error:" + err);
        });
    });



    // var mypromise = minonUser.save().exec();
    // mypromise.then(function (res) {
    //     console.log("Inser User Res:"+ res);
    //     var main_Id,minor_Id;
    //     User.find ({'user_id' : mainUser.user_id}
    //     ).then(function (res) {
    //         main_Id = res[0].id;
    //         console.log("main_Id Res:" + main_Id);
    //     },function (error) {
    //         console.log("Find Error:" + err);
    //     });
    // },function (error){
    //     console.log("User Insert Error:" + error);
    // });

    // var main_Id,minor_Id;
    // User.find ({'user_id' : mainUser.user_id}, function(err, res){
    //     if (err) {
    //         console.log("Find Error:" + err);
    //     }
    //     else {
    //         // main_Id = res[0].id;
    //         console.log("main_Id Res:" + main_Id);
    //     }
    // });

    // console.log("++++++ mytest Res:" + mytest[0]);
    // User.find ({'user_id' : minonUser.user_id}, function(err, res){
    //     if (err) {
    //         console.log("Find Error:" + err);
    //     }
    //     else {
    //         // minor_Id = res[0].id;
    //         console.log("minor_Id Res:" + minor_Id);
    //     }
    // });
    var card = new Card (
        {
            card_num : '621024344423232',
            bank : '招商银行',
            type : 0,
            credit_line : credit_line,
            main_id : mongoose.SchemaTypes.ObjectId(main_Id),
            minor_id : minor_Id
        }
    );
    card.save (function(err,res) {
        if (err) {
            console.log("Card Insert Error:" + err);
        }
        else {
            console.log("Res:"+ res);
        }
    });
};

exports.function = applyCard;