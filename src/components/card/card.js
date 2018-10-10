import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'

import './card.scss'

import parentsAvatar from '../../images/avatar/parents@2x.png';
import childAvatar from '../../images/avatar/children@2x.png';

/**
 * 主卡列表项
 */
export default class Card extends Component {

  render () {
    const {...data} = this.props;
    const title = '为' + data.role + '开通的';
    const avatar = data.role == '父亲' ? parentsAvatar : childAvatar;
    return (
      <View className="card">
        <Text className="title">{title}</Text>
        <View className="detail">
          <Image className="avatar" src={avatar}></Image>
          <Text className="name">{data.name}</Text>
          <View className="amount">
            <Text className="total">{'￥' + data.total}</Text>
            <Text className="quota">{'剩余￥' + data.quota}</Text>
          </View>
        </View>
      </View>
    );
  }
}
