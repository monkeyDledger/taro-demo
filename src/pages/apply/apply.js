import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image, Input } from '@tarojs/components';
import Header from '../../components/header/header';
import './apply.scss';

import arrowRight from '../../images/form/gray_right_default@2x.png';

export default class Apply extends Component {
  config = {
    navigationBarTitleText: '申请附属卡'
  };

  constructor() {
    super(...arguments);
    this.state = {
      role: '',
      phone: '',
      identityNo: '',
      name: '',
      card: ''
    };
  }

  componentDidMount() {
    this.roleList = ['父亲', '母亲'];
  }

  handleRoleChange() {}

  handlePhoneChange() {}

  handleIdNumberChange() {}

  handleNameChange() {

  }

  handleNext() {
    const { ...states } = this.state;
    const isInfoCompleted =
      states.role && states.phone && states.identityNo && states.card;
    if (isInfoCompleted) {
      Taro.showToast({
        title: '信息未填写完整',
        duration: 1500,
        icon: 'none'
      });
    } else {
      // TODO，信息校验
      Taro.navigateTo({
        url: '../amount/amount'
      });
    }
  }

  handleSelectRole() {
    Taro.showActionSheet({
      itemList: this.roleList,
      itemColor: '#333333',
      success: (res) => {
        const role = this.roleList[res.tapIndex];
        role && this.setState({role});
      },
      fail: (res) => {
        console.error(res.errMsg);
      }
    })
  }

  render() {
    const { role, phone, identityNo, name, card } = this.state;
    return (
      <View className="container">
        <Header text={this.config.navigationBarTitleText} />
        <View className="main">
          <Text className="label">选择对方角色</Text>
          <View className="form-container">
            <View className="input-line">
              <Text className="input-label">角色</Text>
              <View className="input-content" onClick={this.handleSelectRole.bind(this)}>
                <Input
                  placeholder="选择与主卡人关系"
                  value={role}
                  onChange={this.handleRoleChange}
                />
              </View>
              <Image className="input-icon" src={arrowRight} />
            </View>
            <View className="divider" />
            <View className="input-line">
              <Text className="input-label">手机号码</Text>
              <View className="input-content">
                <Input
                  placeholder="输入对方手机号"
                  value={phone}
                  onChange={this.handlePhoneChange}
                />
              </View>
            </View>
            <View className="divider" />
            <View className="input-line">
              <Text className="input-label">身份证号</Text>
              <View className="input-content">
                <Input
                  placeholder="输入对方身份证号"
                  value={identityNo}
                  onChange={this.handleIdNumberChange}
                />
              </View>
            </View>
            <View className="divider" />
            <View className="input-line">
              <Text className="input-label">姓名</Text>
              <View className="input-content">
                <Input
                  placeholder="输入对方姓名"
                  value={name}
                  onChange={this.handleNameChange}
                />
              </View>
            </View>
          </View>
          <Text className="label">选择本人信用卡</Text>
          <View className="form-container">
            <View className="input-line">
              <Text className="input-label">信用卡</Text>
              <View className="input-content">
                <Input
                  placeholder="选择一张信用卡"
                  value={card}
                  onChange={this.handleRoleChange}
                />
              </View>
              <Image className="input-icon" src={arrowRight} />
            </View>
          </View>
        </View>
        <View
          className="next-btn disabled"
          onClick={this.handleNext.bind(this)}
        >
          下一步
        </View>
      </View>
    );
  }
}
