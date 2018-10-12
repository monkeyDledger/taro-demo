
/**
 * POST test
 * @param {*} req
 * @param {*} res
 */
var User = require('../db/model/user');

module.exports = (req, res) => {
  
  var wherestr = {"user_id":req.body.peopleId};
  var updatestr = {"black_list":req.body.black_list};
  var jsonString = JSON.stringify(req.body);  
  console.log("req body:"+req.body.black_list);
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
