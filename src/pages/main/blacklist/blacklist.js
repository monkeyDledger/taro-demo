import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import Header from '../../../components/header/header';
import BlackItem from '../../../components/black/black';

import './blacklist.scss';

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
          name: '王者荣耀充值服务',
          type: '禁止消费'
        },
        {
          id: '2',
          name: 'cf充值服务',
          type: '禁止消费'
        },
      ]
    };
  }

  handleNext() {}

  render() {
    const { blacklist } = this.state;
    const blacks = blacklist.map(item => {
      return (
        <BlackItem
          key={item.id}
          name={item.name}
          type={item.type}
        />
      );
    });
    return (
      <View className="container">
        <Header text={this.config.navigationBarTitleText} />
        <View className="main">
          {blacks}
        </View>
      </View>
    );
  }
}
