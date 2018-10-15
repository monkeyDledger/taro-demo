import Taro from '@tarojs/taro';

const globalData = {}

const baseUrl = 'http://172.18.3.32:3100/api/';
// const baseUrl = 'http://172.21.180.7:3100/api';

const set = (key, val) => {
  if (val) {
    globalData[key] = val;
  }
}

const get = (key) => {
  return globalData[key];
}

const post = (path, data) => {
  return new Promise((resolve, reject) => {
    Taro.request({
      url: baseUrl + path,
      method: 'POST',
      data: data,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
    }).then(res => {
      const resData = res.data;
      if (res.statusCode == 200 && resData && resData.code == 1000) {
        resolve(resData);
      } else {
        Taro.showToast({
          title: '请求失败:' + resData.msg,
          icon: 'none',
        });
        reject(resData.msg);
      }
    })
  })
}

export default global = {
  data: globalData,
  post: post,
  set: set,
  get: get,
}
