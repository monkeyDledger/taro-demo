import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import Header from '../../../components/header/header';
import Card from '../../../components/card/card';

import './index.scss';

export default class ChildIndex extends Component {
  config = {
    navigationBarTitleText: '云家付'
  };

  constructor() {
    super(...arguments);
    this.state = {
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
          name: '*溪',
          role: '儿子',
          total: 180,
          quota: 100
        },
      ]
    };
  }

  render() {
    const { list } = this.state;
    const route = this.$router;
    const cards = list.map(item => {
      return (
        <Card
          key={item.id}
          name={item.name}
          role={item.role}
          total={item.total}
          quota={item.quota}
        />
      );
    });
    return (
      <View className="container">
        <Header text={this.config.navigationBarTitleText} route={route} />
        <View className="list-main">
          <View className="list-top">
            <Text className="list-title">附属卡</Text>
            <Image
              className="add-icon"
              src={addIcon}
              onClick={this.handleAddNewCard.bind(this)}
            />
          </View>
          {cards}
        </View>
      </View>
    );
  }
}
