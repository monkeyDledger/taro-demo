
/**
 * POST test
 * @param {*} req
 * @param {*} res
 */

 var insertTest = require('../db/operatedb');
module.exports = (req, res) => {
  insertTest.function();
  console.log(req.body);
  res.send('test success');

}
