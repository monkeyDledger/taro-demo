
/**
 * POST test
 * @param {*} req
 * @param {*} res
 */

var Card = require('../db/model/card');
var Account = require('../db/model/account');
module.exports = (req, res) => {
  var card = new Card({
    card_num : req.body.card_num
  });
  Card.find({card_num:card.card_num},function(error,cards){
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
      Account.find({consum_card:cards[0]},function (error,accounts){
        if (error) {
          console.log("Find Error:" + error);
          res.send({code:1002,msg:error});
        }
        else {
          res.send({code:1000,msg:'成功',data:accounts});
        }
      });
    }
  });
  
}
