import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Input } from '@tarojs/components'
import Header from '../../components/header/header'
import './apply.scss'

import arrowRight from '../../images/form/gray_right_default@2x.png'

export default class Apply extends Component {

  config = {
    navigationBarTitleText: '申请附属卡'
  }

  constructor() {
    super(...arguments);
    this.state = {
      role: '',
      phone: '',
      identityNo: '',
      card: '',
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleRoleChange () {

  }

  handlePhoneChange () {

  }

  handleIdNumberChange () {

  }

  handleNext () {
    const {...states} = this.state
    const isInfoCompleted = states.role && states.phone && states.identityNo && states.card;
    if (isInfoCompleted) {
      Taro.showToast({
        title: '信息未填写完整',
        duration: 1500,
        icon: 'none',
      });
    } else {
      // TODO，信息校验
      Taro.navigateTo({
        url: '../amount/amount',
      });
    }
  }

  render () {
    const {role, phone, identityNo, card} = this.state;
    return (
      <View className='container'>
        <Header
          text={this.config.navigationBarTitleText}
        />
        <View className='main'>
          <Text className='label'>选择对方角色</Text>
          <View className='form-container'>
            <View className='input-line'>
              <Text className='input-label'>角色</Text>
              <View className='input-content'>
                <Input
                  placeholder='选择与主卡人关系'
                  value={role}
                  onChange={this.handleRoleChange}
                >
                </Input>
              </View>
              <Image className='input-icon' src={arrowRight}></Image>
            </View>
            <View className='divider'></View>
            <View className='input-line'>
              <Text className='input-label'>手机号码</Text>
              <View className='input-content'>
                <Input
                  placeholder='点击输入手机号'
                  value={phone}
                  onChange={this.handlePhoneChange}
                >
                </Input>
              </View>
            </View>
            <View className='divider'></View>
            <View className='input-line'>
              <Text className='input-label'>身份证号</Text>
              <View className='input-content'>
                <Input
                  placeholder='点击输入身份证号'
                  value={identityNo}
                  onChange={this.handleIdNumberChange}
                >
                </Input>
              </View>
            </View>
          </View>
          <Text className='label'>选择本人信用卡</Text>
          <View className='form-container'>
            <View className='input-line'>
              <Text className='input-label'>信用卡</Text>
              <View className='input-content'>
                <Input
                  placeholder='选择一张信用卡'
                  value={card}
                  onChange={this.handleRoleChange}
                >
                </Input>
              </View>
              <Image className='input-icon' src={arrowRight}></Image>
            </View>
           </View>
        </View>
        <View
          className='next-btn disabled'
          onClick={this.handleNext.bind(this)}
        >
          下一步
        </View>
      </View>
    )
  }
}
