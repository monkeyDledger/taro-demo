import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'

import './black.scss'

import leftIcon from '../../images/icons/icon_salary@2x.png'
import arrowRight from '../../images/form/gray_right_default@2x.png'

/**
 * 黑名单列表项
 */
export default class Card extends Component {

  render () {
    const {...data} = this.props;
    return (
      <View className="card-black">
        <Image className="left-icon" src={leftIcon}></Image>
        <Text className="black-name">{data.name}</Text>
        <View className="black-right">
          <Text className="black-type">{data.type}</Text>
          <Image className="arrow-icon" src={arrowRight}></Image>
        </View>
      </View>
    );
  }
}
