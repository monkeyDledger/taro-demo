import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image, Progress } from '@tarojs/components';
import Header from '../../../components/header/header';
import Card from '../../../components/card/card';

import './index.scss';
import addIcon from '../../../images/icons/add_card@2x.png';
import global from '../../../global';
export default class ChildIndex extends Component {
  config = {
    navigationBarTitleText: '云家付'
  };

  constructor() {
    super(...arguments);
    this.state = {
      amount: 2000,
      quota: 800,
      list: [
        {
          id: '1',
          name: '*军',
          role: '父亲',
          total: 2000,
          quota: 1000
        },
        {
          id: '2',
          name: '*琴',
          role: '母亲',
          total: 600,
          quota: 800
        }
      ]
    };
  }

  componentDidMount() {
    const user = global.get('user') || {};
    const list = user.data.infolist;
    if (list && list.length > 0) {
      this.setState({list});
    }
  }

  onItemClick(item) {
    const param = 'role=' + item.role + '&cardId=' + item.id + '&name=' + item.name+ '&isMain';
    Taro.navigateTo({
      url: '../../main/detail/detail?' + param,
    })
  }

  onChildDetailClick() {
    Taro.navigateTo({
      url: '../plan/plan'
    });
  }

  render() {
    const { list, quota, amount } = this.state;
    const route = this.$router;
    const cards = list.map(item => {
      return (
        <Card
          key={item.id}
          name={item.name}
          role={item.role}
          total={item.total}
          quota={item.quota}
          onCardClick={this.onItemClick.bind(this, item)}
        />
      );
    });
    const quotaText = '10月剩余预算：' + quota + '元';
    const percent = Math.round((quota / amount) * 100);
    return (
      <View className="container">
        <Header text={this.config.navigationBarTitleText} route={route} />
        <View className="child-main">
          <View className="child-header">
            <View className="header-left">
              <Text className="header-left-title">月度预算</Text>
              <Text className="header-left-amount">{amount}</Text>
              <Text className="header-left-quota">{quotaText}</Text>
            </View>
            <View className="header-btn" onClick={this.onChildDetailClick.bind(this)}>详情</View>
            <View className="header-progress">
              <Text className="header-progress-text">低于20%时提醒</Text>
              <Progress percent={percent} active />
            </View>
          </View>
          <View className="child-content">
            <View className="list-top">
              <Text className="list-title">附属卡</Text>
              <Image className="add-icon" src={addIcon} />
            </View>
            {cards}
          </View>
        </View>
      </View>
    );
  }
}
