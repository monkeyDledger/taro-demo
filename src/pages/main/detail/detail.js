import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image, Progress } from '@tarojs/components';
import cls from 'classnames';

import Header from '../../../components/header/header';
import Timeline from '../../../components/timeline/timeline';

import './detail.scss';

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
      curTab: 'history',
      isMain: true
    };
  }

  componentWillMount() {
    const param = this.$router.params;
    const isMain = param.isMain;
    const title = isMain ? '为' + param.role + '开通的' : '来自' + param.role;
    const state = {
      title: title,
      name: param.name,
      role: param.role,
      isMain: isMain ? true : false,
      accountList: [
        {
          id: 1,
          time: '2018.10.02 15:30',
          merchant: 'KFC',
          money: '22',
          comment: 3
        },
        {
          id: 2,
          time: '2018.10.02 15:30',
          merchant: '新东方',
          money: '120',
          comment: 1
        },
        {
          id: 3,
          time: '2018.10.02 15:30',
          merchant: '星巴克',
          money: '36',
          comment: 0
        }
      ]
    };
    this.setState(state);
  }

  onTabClick(tab) {
    const curTab = tab;
    this.setState({ curTab });
  }

  onBlackBtnClick() {
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

  render() {
    const { ...state } = this.state;
    const user = state.name + '(' + state.role + ')';
    const amount = state.quota + '/' + state.total + '元';
    const progressColor = '#F5F5F5';
    const percent = Math.round((state.quota / state.total) * 100);

    const historyTabStyle = cls({
      'detail-tab-text': true,
      selected: state.curTab === 'history'
    });
    const settingTabStyle = cls({
      'detail-tab-text': true,
      selected: state.curTab === 'setting'
    });

    let tabContent = null;
    tabContent =
      state.curTab === 'history' ? (
        <View className="history-container">
          <View className="history-header" onClick={this.onTagClick}>
            <Text className="history-header-text">评价标签</Text>
            <Image className="history-header-icon" src={arrowDown} />
          </View>
        </View>
      ) : (
        <View className="setting-container">
          <View
            className="setting-item"
            onClick={this.onBlackBtnClick.bind(this)}
          >
            <Image className="setting-icon" src={settingBlack} />
            <Text className="setting-text">黑名单设置</Text>
          </View>
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

      const timeline = state.map(item => {
        return (
          <Timeline
            key={item.id}
            time={item.time}
            merchant={item.merchant}
            money={item.money}
            comment={item.money}
          />
        )
      })

    return (
      <View className="container">
        <Header text={state.title} />

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
                activeColor={progressColor}
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
          <View className="detail-timeline">
          {timeline}
          </View>
        </View>
      </View>
    );
  }
}
