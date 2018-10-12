import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';

import './timeline.scss';

import smileIcon from '../../images/icons/smile@2x.png';
import peaceIcon from '../../images/icons/peace@2x.png';
import sadIcon from '../../images/icons/sad@2x.png';
/**
 * 交易记录
 */
export default class TimeLine extends Component {
  render() {
    const { ...props } = this.props;
    let expression = null;
    let commentIcon = null;

    if (props.comment) {
      commentIcon = props.comment === 1 ? smileIcon : expression === 2 ? peaceIcon : sadIcon;
      expression = (
        <Image className="timeline-right-icon" src={commentIcon} />
      )
    }

    return (
      <View className="timeline-item">
        <View className="timeline-left">
          <Image className="timeline-left-icon"></Image>
        </View>
        <Text className="timeline-content">{props.merchant}</Text>
        <View className="timeline-right">
          {expression}
          <Text className="timeline-right-text">{props.money}</Text>
          <Text className="timeline-right-date">{props.time}</Text>
        </View>
      </View>
    )
  }
}
