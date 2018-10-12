
/**
 * POST test
 * @param {*} req
 * @param {*} res
 */
var User = require('../db/model/user');
var Card = require('../db/model/card');
var randomstring = require('randomstring');
module.exports = (req, res) => {
  var mainUser = new User({
    user_id : req.body.mainId
  });

  var minorUser = new User ({
    user_id :req.body.minorId,
    name :req.body.minorName,
    phone : req.body.phone,
    role :req.body.role
  });

  minorUser.save(function(err,result) {
    if(err) {
      console.log("User Insert Error:" + error);
      res.send({code:1002,msg:err});
    }
    else {
      var main_Id,minor_Id;
        User.find ({'user_id' : mainUser.user_id})
        .exec().then(function (result) {
            main_Id = result[0].id;
            console.log("main_Id Res:" + main_Id);

            User.find ({'user_id' : minorUser.user_id})
            .exec().then(function (result){
                minor_Id = result[0].id;
                console.log("minor_Id Res:" + minor_Id);
                var card = new Card (
                  {
                    
                      card_num : '62'+randomstring.generate({
                        length: 14,
                        charset: '0123456789'
                      }),
                      bank : '中国银行',
                      type : 2,
                      credit_line : req.body.credit_line,
                      main_id : main_Id,
                      minor_id : minor_Id
                  }
                );
                card.save (function(error,result) {
                  if (err) {
                      console.log("Card Insert Error:" + error);
                      res.send({code:1002,msg:error});
                  }
                  else {
                      console.log("Res:"+ result);
                      res.send({code:1000,msg:"成功"});
                  }
              });
            },function (error){
              console.log("Find Error:" + error);
              res.send({code:1002,msg:error});
            });

        },function (error) {
            console.log("Find Error:" + error);
            res.send({code:1002,msg:error});
        });
    }
  });
}
