import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';

import './card.scss';

import parentsAvatar from '../../images/avatar/parents@2x.png';
import childAvatar from '../../images/avatar/children@2x.png';

/**
 * 主卡列表项
 */
export default class Card extends Component {
  render() {
    const { isMain, role, applying, total, quota, onCardClick, name } = this.props;
    const title = isMain ? '为' + role + '开通的' : '来自' + role;
    const avatar = role == '父亲' ? parentsAvatar : childAvatar;

    const right = applying ? (
      <View className="card-applying">
        <Text className="card-applying-text">申请中</Text>
      </View>
    ) : (
      <View className="card-amount">
        <Text className="card-amount-total">{'￥' + total}</Text>
        <Text className="card-amount-quota">{'剩余￥' + quota}</Text>
      </View>
    );

    return (
      <View className="list-card" onClick={onCardClick}>
        <Text className="card-title">{title}</Text>
        <View className="card-detail">
          <Image className="card-avatar" src={avatar} />
          <Text className="card-name">{name}</Text>
          {right}
        </View>
      </View>
    );
  }
}
