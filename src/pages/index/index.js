import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text, Input } from '@tarojs/components';
import cls from 'classnames';
import global from '../../global';

import './index.scss';
import bgImg from '../../images/login@2x.png';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '13127772666',
      password: '',
      isLoginAbled: false,
    };
  }

  handlePhoneChange(e) {
    const phone = e.detail.value;
    this.setState({phone});
  }

  handlePasswordChange(e) {
    const password = e.detail.value;
    this.setState({password}, (nextState) => {
        this.setState({
          isLoginAbled: true,
        });
    });
  }

  handleLogin() {
    const {phone, password} = this.state;
    if (phone && password) {
      global.post('getuserinfo', {
        phone: phone,
        password: password
      }).then(res => {
        console.log(res);
        global.set('user', res.data);
        global.set('phone', phone);
        const data = res.data;
        if (data) {
          if (data.role == '主卡人') {
            if (data.infolist && data.infolist.length > 0) {
              Taro.navigateTo({
                url: '/pages/main/list/list',
              })
            } else {
              Taro.navigateTo({
                url: '/pages/home/home'
              })
            }
          }
          if (data.role == '父亲' || data.role == '母亲') {
            Taro.navigateTo({
              url: '/pages/parents/parents'
            })
          }
          if (data.role == '儿子' || data.role == '女儿') {
            Taro.navigateTo({
              url: '/pages/child/index/index',
            })
          }
        }
      })
    }
  }

  render() {
    const {phone, password, isLoginAbled} = this.state;
    const btnStyle = cls({
      'next-btn': true,
      'disabled': !isLoginAbled
    });
    return (
      <View className="login-main">
        <Image className="back-img" src={bgImg} />
        <View className="login-form">
          <View className="form-container login-input">
            <View className="input-line login-line">
              <Text className="input-label">手机号</Text>
              <View
                className="input-content"
              >
                <Input
                  placeholder="输入已注册云闪付的手机号"
                  type="number"
                  value={phone}
                  onChange={this.handlePhoneChange.bind(this)}
                />
              </View>
            </View>
          </View>
          <View className="form-container">
            <View className="input-line">
              <Text className="input-label">密码</Text>
              <View
                className="input-content"
              >
                <Input
                  placeholder="输入密码"
                  value={password}
                  type="password"
                  onChange={this.handlePasswordChange.bind(this)}
                />
              </View>
            </View>
          </View>
        </View>
        <View
          className={btnStyle}
          onClick={this.handleLogin.bind(this)}
        >
          登录
        </View>
      </View>
    );
  }
}
