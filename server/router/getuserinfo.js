
/**
 * POST test
 * @param {*} req
 * @param {*} res
 */
var User = require('../db/model/user');
var Card = require('../db/model/card');

module.exports = (req, res) => {
  if(!req) {
    console.log("Params Error" );
    res.send({code:1001,msg:"参数错误"});
    return;
  }
  var mainUser = new User({
    user_id : req.body.mainId
  });
  let main_role;
  User.find({'user_id' : mainUser.user_id})
  .exec().then(function (users) {
    main_role = users[0].role;
    var where;
    if(main_role == "主卡人") {
      where = {main_id:{$in:users}};
    } else {
      where = {minor_id:{$in:users}};
    }
    Card.find(where,function (error,cards){
      if (error) {
        console.log("Find Error:" + error);
        res.send({code:1002,msg:error});
      }
      else {
        if(cards.length<1) {
          console.log("No Data!");
          res.send({code:1002,msg:"No Data!"});
          return;
        }
        var result = cards.map((card) => {
          let getResult = function() {
            return new Promise((resolve,reject) => {
              var check_id;
              if(main_role == "主卡人") {
                check_id = card.minor_id;
              }else {
                check_id = card.main_id;
              }
              User.find({'_id':check_id},function(error,minor_users){
                if (error) {
                  console.log("Find Error:" + error);
                  res.send({code:1002,msg:error});
                }
                else {
                  var jsonString = JSON.stringify(card);  
                  var newcard = JSON.parse(jsonString);
                  newcard["people"] = minor_users[0].user_id;
                  newcard["name"] = minor_users[0].name;
                  newcard["role"] = minor_users[0].role;
                  newcard["sex"] = minor_users[0].sex;
                  resolve(newcard);
                }
              });
            });
          };
          return getResult();
        });
        Promise.all(result).then((infolist) => {
          console.log("result: " + result.toString())
          res.send({code:1000,msg:'成功',data:{role:main_role,infolist}});
        });
      }
    });
  },function(error) {
    console.log("Find Error:" + error);
    res.send({code:1002,msg:error});
  });
}



