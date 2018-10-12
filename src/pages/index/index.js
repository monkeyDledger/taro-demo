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
        if (res.data && res.data.infolist) {
          Taro.navigateTo({
            url: 'pages/main/list/list',
          })
        } else {
          Taro.navigateTo({
            url: 'pages/home/home'
          })
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
