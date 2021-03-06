import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

import Header from '../../../components/header/header';
import GameItem from '../../../components/game/game';

import './blackmanage.scss';

import global from '../../../global';

import pvpIcon from '../../../images/black_logo/王者荣耀@2x.png';
import lolIcon from '../../../images/black_logo/英雄联盟@2x.png';
import cfIcon from '../../../images/black_logo/CF@2x.png';

export default class BlackManage extends Component {
  config = {
    navigationBarTitleText: '编辑黑名单'
  };

  constructor() {
    super(...arguments);
    this.state = {
      gameList: [
        {
          merchant: '王者荣耀点券充值',
          logo: pvpIcon,
          checked: false
        },
        {
          merchant: '英雄联盟充值服务',
          logo: lolIcon,
          checked: false,
        },
        {
          merchant: 'CF充值服务',
          logo: cfIcon,
          checked: false,
        }
      ]
    };
  }

  componentDidMount() {
    const gameList = global.get('blacklist') || this.state.gameList;
    this.setState({gameList});
  }

  onItemClick(index) {
    const {gameList} = this.state;
    gameList[index].checked = !gameList[index].checked;
    this.setState({gameList});
  }

  onCancelBtnClick() {
    // 黑名单恢复为初始值 TODO
    Taro.navigateBack();
  }

  onConfirmBtnClick() {
    const selectedList = this.state.gameList.filter(item => {
      return item.checked;
    });
    console.log(selectedList);
    const param = {
      peopleId: global.get('people') || '',
      black_list: JSON.stringify(selectedList),
    };
    global.post('setblacklist', param).then(res => {
      console.log('setblack', res);
    })
    Taro.navigateBack();
  }

  render() {
    const { gameList } = this.state;
    const games = gameList.map((item, index) => {
      return <GameItem key={index} name={item.merchant} logo={item.logo} checked={item.checked} onItemClick={this.onItemClick.bind(this, index)} />;
    });
    return (
      <View className="container">
        <Header text={this.config.navigationBarTitleText} />
        <View className="manage-main">{games}</View>
        <View className="manage-footer">
          <View className="footer-btn cancel" onClick={this.onCancelBtnClick.bind(this)}>取消</View>
          <View className="footer-btn confirm" onClick={this.onConfirmBtnClick.bind(this)}>确认</View>
        </View>
      </View>
    );
  }
}
