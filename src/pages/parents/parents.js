import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import Header from '../../components/header/header';

import './parents.scss';
import myIcon from '../../images/icons/my_icon@2x.png';
import billIcon from '../../images/icons/parents_bill@2x.png';
import menAvatar from '../../images/avatar/men@2x.png';
import womenAvatar from '../../images/avatar/women@2x.png';

export default class ChildIndex extends Component {
  config = {
    navigationBarTitleText: '云家付'
  };

  constructor() {
    super(...arguments);
    this.state = {
      familyList: [
        {
          role: '儿子',
          name: '*阳',
          avatar: menAvatar,
        },
        {
          role: '女儿',
          name: '*琴',
          avatar: womenAvatar,
        }
      ]
    };
  }

  render() {
    const { familyList } = this.state;
    const familylist = familyList.map((item, index) => {
      return (
        <View className="family-item" key={index}>
          <Image className="family-avatar" src={item.avatar} />
          <Text className="family-text">
            {item.role + '(' + item.name + ')'}
          </Text>
        </View>
      );
    });
    return (
      <View className="container">
        <Header text={this.config.navigationBarTitleText} />
        <View className="parents-main">
          <View className="parents-content">
            <View className="parents-card func left">
              <Image className="parents-card-icon" src={myIcon} />
              <Text className="parents-card-text">我的</Text>
            </View>
            <View className="parents-card func">
              <Image className="parents-card-icon" src={billIcon} />
              <Text className="parents-card-text">账单</Text>
            </View>
            <View className="parents-card family">
              <Text className="parents-card-text card-label">家庭成员</Text>
              {familylist}
            </View>
          </View>
        </View>
      </View>
    );
  }
}
