
/**
 * POST test
 * @param {*} req
 * @param {*} res
 */
var Card = require('../db/model/card');

module.exports = (req, res) => {


  var wherestr = {"card_num":req.body.card_num};
  var updatestr = {"credit_line":req.body.credit_line,"single_line":req.body.single_line};


  Card.update(wherestr,updatestr,function(error,result){
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
