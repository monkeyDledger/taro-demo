import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';

import './timeline.scss';

import smileIcon from '../../images/icons/smile@2x.png';
import peaceIcon from '../../images/icons/peace@2x.png';
import sadIcon from '../../images/icons/sad@2x.png';
import breakIcon from '../../images/icons/icon_breakfast@2x.png';
import coffeeIcon from '../../images/icons/icon_coffee@2x.png';
import salleryIcon from '../../images/icons/icon_salary@2x.png';
/**
 * 交易记录
 */
export default class TimeLine extends Component {
  render() {
    const { comment, type, onItemClick, merchant, money, time } = this.props;
    let expression = null;
    let commentIcon = null;
    const leftIcon =
      type == 'food'
        ? breakIcon
        : type == 'coffee'
          ? coffeeIcon
          : salleryIcon;

    if (comment) {
      commentIcon =
        comment === 1
          ? smileIcon
          : comment === 2
            ? peaceIcon
            : sadIcon;
      console.log(commentIcon);
      expression = <Image className="timeline-right-icon" src={commentIcon} />;
    }

    return (
      <View className="timeline-item" onClick={onItemClick}>
        <Image className="timeline-left-icon" src={leftIcon} />
        <Text className="timeline-content">{merchant}</Text>
        <View className="timeline-right">
          <Text className="timeline-right-text">{money}</Text>
          {expression}
          <Text className="timeline-right-date">{time}</Text>
        </View>
      </View>
    );
  }
}
