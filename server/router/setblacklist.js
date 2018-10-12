
/**
 * POST test
 * @param {*} req
 * @param {*} res
 */
var User = require('../db/model/user');

module.exports = (req, res) => {
  if(!req.body) {
    console.log("Params Error" );
    res.send({code:1001,msg:"参数错误"});
    return;
  }
  console.log("body:"+req.body.peopleId);

  var wherestr = {"user_id":req.body.peopleId};
  var updatestr = {"black_list":req.body.black_list};

 console.log("black_list:"+req.body.black_list);

  User.update(wherestr,updatestr,function(error,result){
    if (error) {
      console.log("Update Error:" + error);
      res.send({code:1002,msg:error});
    }
    else {
      console.log("Update Success");
      res.send({code:1000,msg:"成功"});
    }
  });
  
}
