import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import Header from '../../components/header/header';
import './status.scss';

import spdCard from '../../images/cards/card_spd@2x.png'

/**
 * 卡详情
 * TODO 下拉刷新(weapp)
 */
export default class Status extends Component {
  config = {
    navigationBarTitleText: '云家付'
  };

  constructor() {
    super(...arguments);
    this.state = {};
  }

  handleNext() {
    Taro.navigateTo({
      url: '../main/list/list',
    })
  }

  render() {
    return (
      <View className="container">
        <Header text={this.config.navigationBarTitleText} />
        <View className="main" >
          <View className="card-container">
            <Image className="card-img" src={spdCard}></Image>
            <View className="card-mask">
              <Text className="card-text status">申请中</Text>
            </View>
          </View>
          <Text className="tips top">附属卡申请中</Text>
          <Text className="tips">申请成功后，对方绑卡即可享受便捷支付</Text>
        </View>
        <View
          className="next-btn"
          onClick={this.handleNext.bind(this)}
        >
          完成
        </View>
      </View>
    );
  }
}
