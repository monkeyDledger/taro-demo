import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image, Progress } from '@tarojs/components';
import cls from 'classnames';

import Header from '../../../components/header/header';
import Timeline from '../../../components/timeline/timeline';

import './detail.scss';

import global from '../../../global';

import spdCard from '../../../images/cards/card_spd@2x.png';
import arrowDown from '../../../images/icons/arrow_down@2x.png';
import settingBlack from '../../../images/icons/setting_black@2x.png';
import settingLimit from '../../../images/icons/setting_limit@2x.png';
import settingDelete from '../../../images/icons/setting_delete@2x.png';

/**
 * 主卡的卡详情
 */
export default class Detail extends Component {
  config = {
    navigationBarTitleText: '云家付'
  };

  constructor() {
    super(...arguments);
    this.state = {
      title: '为某某开通的',
      name: '',
      role: '',
      quota: 600,
      total: 800,
      curTab: 'history'
    };
  }

  componentWillMount() {
    // const param = this.$router.params;
    // const isMain = param.isMain;
    const cardDetail = global.get('cardDetail') || {};
    const title = cardDetail.isMain
      ? '为' + cardDetail.role + '开通的'
      : '来自' + cardDetail.role;
    let state = {
      title: title,
      name: cardDetail.name,
      role: cardDetail.role,
      isMain: cardDetail.isMain,
      quota: cardDetail.quota,
      total: cardDetail.total,
      people: cardDetail.people,
      accountList: [
        {
          id: 1,
          type: 'food',
          time: '2018.10.02 15:30',
          merchant: 'KFC',
          money: '22',
          comment: 3
        },
        {
          id: 2,
          type: 'salary',
          time: '2018.10.02 15:30',
          merchant: '新东方',
          money: '120',
          comment: 1
        },
        {
          id: 3,
          type: 'coffee',
          time: '2018.10.02 15:30',
          merchant: '星巴克',
          money: '36',
          comment: 0
        }
      ]
    };
    const card_num = cardDetail['card_num'];
    if (card_num) {
      global.post('accountlist', { card_num: card_num }).then(res => {
        console.log('account', res);
        state.accountList = res.data;
        this.setState(state);
      });
    }
  }

  onTabClick(tab) {
    const curTab = tab;
    this.setState({ curTab });
  }

  onBlackBtnClick() {
    const {people} = this.state;
    global.set('people', people);
    Taro.navigateTo({
      url: '../blacklist/blacklist'
    });
  }
  onLimitBtnClick() {
    Taro.navigateTo({
      url: '../limit/limit'
    });
  }
  onDeleteBtnClick() {
    const param = {
      title: '您确定要解绑该银行卡吗？',
      content: '解绑后，该银行卡在云闪付APP所关联的信息将全部删除。',
      cancelColor: '#666',
      confirmColor: '#ED171F',
      success: res => {
        // TODO 解绑卡
      },
      fail: res => {
        console.error(res.errMsg);
      }
    };
    Taro.showModal(param);
  }

  onTagClick() {}

  onTimeItemClick(item) {
    console.log('click item');
    const transaction = {
      expression: item.comment,
      roleName: this.state.name,
      role: this.state.role,
    }
    global.set('transaction', transaction);
    Taro.navigateTo({
      url: '../../transaction/transaction',
    })
  }

  render() {
    const { role, name, quota, total, curTab, accountList, title } = this.state;
    const user = name + '(' + role + ')';
    const amount = quota + '/' + total + '元';
    const percent = Math.round((quota / total) * 100);

    const historyTabStyle = cls({
      'detail-tab-text': true,
      selected: curTab === 'history'
    });
    const settingTabStyle = cls({
      'detail-tab-text': true,
      right: true,
      selected: curTab === 'setting'
    });
    const activeColor = '#ED171F';

    const timeline = accountList && accountList.map(item => {
      return (
        <Timeline
          key={item.id}
          time={item.time}
          merchant={item.merchant}
          money={item.money}
          comment={item.comment}
          type={item.type}
          onItemClick={this.onTimeItemClick.bind(this, item)}
        />
      );
    });

    const isBlackShow = (role == '儿子' || role == '女儿');
    const black = isBlackShow ? (
          <View
            className="setting-item"
            onClick={this.onBlackBtnClick.bind(this)}
          >
            <Image className="setting-icon" src={settingBlack} />
            <Text className="setting-text">黑名单设置</Text>
          </View>
    ) : null;

    const tabContent =
      curTab === 'history' ? (
        <View className="history-container">
          <View className="history-header" onClick={this.onTagClick}>
            <Text className="history-header-text">评价标签</Text>
            <Image className="history-header-icon" src={arrowDown} />
          </View>
          <View className="detail-timeline">{timeline}</View>
        </View>
      ) : (
        <View className="setting-container">
          {black}
          {/* <View
            className="setting-item"
            onClick={this.onBlackBtnClick.bind(this)}
          >
            <Image className="setting-icon" src={settingBlack} />
            <Text className="setting-text">黑名单设置</Text>
          </View> */}
          <View
            className="setting-item"
            onClick={this.onLimitBtnClick.bind(this)}
          >
            <Image className="setting-icon" src={settingLimit} />
            <Text className="setting-text">消费额度设置</Text>
          </View>
          <View
            className="setting-item"
            onClick={this.onDeleteBtnClick.bind(this)}
          >
            <Image className="setting-icon" src={settingDelete} />
            <Text className="setting-text">解绑卡片</Text>
          </View>
        </View>
      );

    return (
      <View className="container">
        <Header text={title} />

        <View className="detail-main">
          <View className="card-container">
            <Image className="card-img" src={spdCard} />
            <View className="card-detail-mask">
              <Text className="card-detail-text label">本月已用/本月额度</Text>
              <Text className="card-detail-text user">{user}</Text>
              <Text className="card-detail-text amount">{amount}</Text>
              <Progress
                className="card-detail-progress"
                percent={percent}
                activeColor={activeColor}
              />
            </View>
          </View>
          <View className="detail-tab">
            <Text
              className={historyTabStyle}
              onClick={this.onTabClick.bind(this, 'history')}
            >
              交易记录
            </Text>
            <Text
              className={settingTabStyle}
              onClick={this.onTabClick.bind(this, 'setting')}
            >
              卡片管理
            </Text>
          </View>
          <View className="tab-content">{tabContent}</View>
        </View>
      </View>
    );
  }
}
