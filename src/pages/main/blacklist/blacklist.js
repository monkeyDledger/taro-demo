import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import Header from '../../../components/header/header';
import BlackItem from '../../../components/black/black';

import './blacklist.scss';

import pvpIcon from '../../../images/black_logo/王者荣耀@2x.png';
import lolIcon from '../../../images/black_logo/英雄联盟@2x.png';
import cfIcon from '../../../images/black_logo/CF@2x.png';

export default class BlackList extends Component {
  config = {
    navigationBarTitleText: '消费黑名单'
  };

  constructor() {
    super(...arguments);
    this.state = {
      blacklist: [
        {
          id: '1',
          name: '王者荣耀点券充值',
          icon: pvpIcon
        },
        {
          id: '2',
          name: '英雄联盟充值服务',
          icon: lolIcon
        },
        {
          id: '3',
          name: 'CF充值服务',
          icon: cfIcon
        }
      ]
    };
  }

  onBtnClick() {
    Taro.navigateTo({
      url: '../blackmanage/blackmanage',
    })
  }

  render() {
    const { blacklist } = this.state;
    const blacks = blacklist.map(item => {
      return <BlackItem key={item.id} name={item.name} icon={item.icon} />;
    });
    return (
      <View className="container">
        <Header text={this.config.navigationBarTitleText} />
        <View className="main">
          <View className="black-top">
            <Text className="black-top-title">黑名单</Text>
            <Text className="black-top-btn" onClick={this.onBtnClick}>管理</Text>
          </View>
          {blacks}
        </View>
      </View>
    );
  }
}
