const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const url = 'mongodb://developer:developer@localhost:27017/arodb';

mongoose.connect(url);

/**
  * 连接成功
  */
 mongoose.connection.on('connected', function () {    
    console.log('Mongoose connection open to ' + url);  
});    

/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {    
    console.log('Mongoose connection error: ' + err);  
});    
 
/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {    
    console.log('Mongoose connection disconnected');  
});    

module.exports = mongoose;