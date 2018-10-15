import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'

import './black.scss'

/**
 * 黑名单列表项
 */
export default class Black extends Component {

  render () {
    const {icon, name} = this.props;
    return (
      <View className="card-black">
        <Image className="left-icon" src={icon}></Image>
        <Text className="black-name">{name}</Text>
        <View className="black-right">
          <Text className="black-type">禁止消费</Text>
        </View>
      </View>
    );
  }
}
