var User = require('./model/user');

var insertUserInfo = function () {
    var user = new User ({
        name : '张三',
        nick_name: 'zhangsan'
    });
     user.save (function (err,res) {
         if (err) {
             console.log("Error:" + err);
         }
         else {
             console.log("Res:"+ res);
         }
     });

};
exports.function = insertUserInfo;