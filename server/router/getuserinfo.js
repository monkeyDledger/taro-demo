
/**
 * POST test
 * @param {*} req
 * @param {*} res
 */
var User = require('../db/model/user');
var Card = require('../db/model/card');

module.exports = (req, res) => {

console.log("my req"+req.body.phone);

  var mainUser = new User({
    phone : req.body.phone
  });
  let main_role;
  User.find({'phone' : mainUser.phone})
  .exec().then(function (users) {
    if(users.length < 1) {
      console.log("No Data!");
      res.send({code:1002,msg:"No Data!"});
      return;
    }

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
        var minorcards = [],maincards = []; 
 
        for(let i=0;i<cards.length;i++) {
          if(cards[i].type == 1) 
            maincards.push(cards[i]);
          if(cards[i].type == 2) 
            minorcards.push(cards[i]);
        }
        
        var result = minorcards.map((card) => {
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
          res.send({code:1000,msg:'成功',data:{role:main_role,card_list:maincards,infolist}});
        });
      }
    });
  },function(error) {
    console.log("Find Error:" + error);
    res.send({code:1002,msg:error});
  });
}



