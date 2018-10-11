import Taro, { Component } from '@tarojs/taro';
import { View, Text, Input } from '@tarojs/components';
import Header from '../../../components/header/header';

import './limit.scss';

export default class Limit extends Component {
  config = {
    navigationBarTitleText: '消费额度设置'
  };

  constructor() {
    super(...arguments);
    this.state = {
      monthLimit: 2000,
      singleLimit: 200
    };
  }

  handleMonthChange(e) {
    const monthLimit = e.detail.value;
    this.setState({monthLimit});
  }

  handleSingleChange(e) {
    const monthLimit = e.detail.value;
    this.setState({monthLimit});
  }

  handleNext() {
    const { monthLimit, singleLimit } = this.state;
    if (monthLimit && singleLimit) {
    } else {
      Taro.showToast({
        title: '请填写完整限额',
        icon: 'none'
      });
    }
  }

  render() {
    const { monthLimit, singleLimit } = this.state;
    return (
      <View className="container">
        <Header text={this.config.navigationBarTitleText} />
        <View className="main">
          <Text className="label">给对方每月的消费上限</Text>
          <View className="form-container">
            <View className="input-line">
              <Text className="input-label">每月额度</Text>
              <View className="input-content">
                <Input
                  placeholder="2000"
                  value={monthLimit}
                  onChange={this.handleMonthChange.bind(this)}
                />
              </View>
              <Text className="input-label right">元/月</Text>
            </View>
          </View>
          <Text className="label">给对方每笔的消费上限</Text>
          <View className="form-container">
            <View className="input-line">
              <Text className="input-label">单笔额度</Text>
              <View className="input-content">
                <Input
                  placeholder="200"
                  value={singleLimit}
                  onChange={this.handleSingleChange.bind(this)}
                />
              </View>
              <Text className="input-label right">元/月</Text>
            </View>
          </View>
        </View>
        <View className="next-btn" onClick={this.handleNext.bind(this)}>
          确认修改
        </View>
      </View>
    );
  }
}
