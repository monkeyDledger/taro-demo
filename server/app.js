const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const distPath = path.resolve(__dirname, 'dist');
const port = process.env.PORT || 3100;

app.use(express.static(distPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 允许跨域
app.all("*", function(req, res, next) {
  if (req.path !== "/" && !req.path.includes(".")) {
    res.header("Access-Control-Allow-Credentials", true);
    // 这里获取 origin 请求头 而不是用 *
    res.header("Access-Control-Allow-Origin", req.headers["origin"] || "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
  }
  next();
});

app.listen(port, () => {
  console.info('server is listening at port', port);
})


