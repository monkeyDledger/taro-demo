
/**
 * POST test
 * @param {*} req
 * @param {*} res
 */
var User = require('../db/model/user');
 var applycardTest = require('../db/operatedb');
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

  applycardTest.function(mainUser,minorUser,req.body.credit_line);
  res.send('添加云家付成功！');

}
