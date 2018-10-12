
/**
 * POST test
 * @param {*} req
 * @param {*} res
 */
var Account = require('../db/model/account');

module.exports = (req, res) => {


  var wherestr = {"account_id":req.body.account_id};
  var updatestr = {"comment":req.body.comment};


  Account.update(wherestr,updatestr,function(error,result){
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
