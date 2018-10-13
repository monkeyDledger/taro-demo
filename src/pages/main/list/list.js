import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image, Input } from '@tarojs/components';
import Header from '../../../components/header/header';
import Card from '../../../components/card/card';

import './list.scss';
import addIcon from '../../../images/nav_bar/add_black@2x.png';

import global from '../../../global';

export default class List extends Component {
  config = {
    navigationBarTitleText: '云家付'
  };

  constructor() {
    super(...arguments);
    this.state = {
      list: [
        {
          "_id": "5bbeef76e982da1a3f72fa67",
          "card_num": 621024344423232,
          "bank": "招商银行",
          "type": 2,
          "credit_line": 21000,
          "main_id": "5bbe0c4603444209cabe8b4d",
          "minor_id": "5bbeef76e982da1a3f72fa66",
          "__v": 0,
          "single_line": 255,
          "people": "312384200903251234",
          "name": "王大庄",
          "role": "儿子"
        },
        {
          "_id": "5bbf284a6a967e23874202f1",
          "card_num": 625794849423232,
          "bank": "农业银行",
          "type": 2,
          "credit_line": 21000,
          "main_id": "5bbe0c4603444209cabe8b4d",
          "minor_id": "5bbf284a6a967e23874202f0",
          "__v": 0,
          "single_line": 255,
          "people": "312384201803251234",
          "name": "王梅",
          "role": "女儿"
        },
        {
          "_id": "5bbf2a64ff81592413724d61",
          "card_num": 6219999344423232,
          "bank": "中国银行",
          "type": 2,
          "credit_line": 2000,
          "main_id": "5bbe0c4603444209cabe8b4d",
          "minor_id": "5bbf2a64ff81592413724d60",
          "__v": 0,
          "people": "312999999999999999",
          "name": "王笑",
          "role": "女儿"
        }
      ],
    };
  }

  componentWillMount() {
    this.user = global.get('user');
    let list = [];
    if (this.user) {
      list = this.user.infolist || [];
      list && this.setState({list});
    }
  }

  componentDidShow() {
    const phone = global.get('phone');

    if (phone) {
      global.post('getuserinfo', {phone: phone}).then(res => {
        const list = res.data.infolist;
        this.setState({list});
      })
    }
  }

  handleAddNewCard() {
    Taro.navigateTo({
      url: '/pages/home/home'
    });
  }

  onItemClick(item) {
    const quota = item.credit_line - item.quota_used || 200;

    const cardDetail = {
      role: item.role,
      cardId: item._id,
      name: item.name,
      isMain: true,
      total: item.credit_line,
      quota: quota,
      card_num: item.card_num,
      people: item.people,
    }
    global.set('cardDetail', cardDetail);
    Taro.navigateTo({
      url: '../detail/detail',
    });
  }

  render() {
    const { list } = this.state;
    const route = this.$router;
    const cards = list.map(item => {
      const quota = item.credit_line - item.quota_used;
      return (
        <Card
          key={item._id}
          isMain
          name={item.name}
          role={item.role}
          total={item.credit_line}
          quota={quota || 200}
          onCardClick={this.onItemClick.bind(this, item)}
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
