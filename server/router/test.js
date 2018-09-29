
/**
 * POST test
 * @param {*} req
 * @param {*} res
 */
module.exports = (req, res) => {
  console.log(req.body);
  res.send('test success');
}
