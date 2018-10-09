const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const router = express.Router();
const distPath = path.resolve(__dirname, '../dist');
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

// 同步读取 router 目录中的js文件, 根据命名规则, 自动注册路由
const routePath = path.join(__dirname, '/router/');
fs.readdirSync(routePath).forEach(file => {
  if (/\.js$/i.test(file) === false) {
    return;
  }

  let route;
    route =
      "/" +
      file
        .replace(/\.js$/i, "")
        .replace(/_/g, "/")
        .replace(/[A-Z]/g, a => {
          return "/" + a.toLowerCase();
        });

  router.post(route, require(path.resolve(routePath, file)));
});

app.use('/api', router);

app.listen(port, () => {
  console.info('server is listening at port', port);
})


