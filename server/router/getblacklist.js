
/**
 * POST test
 * @param {*} req
 * @param {*} res
 */

var User = require('../db/model/user');
module.exports = (req, res) => {

  var user = new User({
    user_id : req.body.peopleId
  });
  User.find({'user_id':user.user_id},function(error,users) {
    if(error) {
      console.log("Find Error:" + error);
      res.send({code:1002,msg:error});
    }
    else {
      if(users.length < 1) {
        res.send({code:1000,msg:"成功",data:[]});
      }else {
        var black_list = users[0].black_list;
        res.send({code:1000,msg:"成功",data:black_list});
      }
        
    }
  });
  
}
