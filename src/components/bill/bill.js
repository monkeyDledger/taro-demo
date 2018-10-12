import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

import './bill.scss';

export default class Bill extends Component {
  render() {
    const { data } = this.props;
    const main = data.map((item, index) => (
      <View className="bill-item" key={index}>
        <Text className="bill-label">{item.label}</Text>
        <Text className="bill-text">{item.text}</Text>
      </View>
    ));
    return <View className="bill-content">{main}</View>;
  }
}
