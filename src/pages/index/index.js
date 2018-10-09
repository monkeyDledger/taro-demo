import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import Header from '../../components/header/header';
import './index.scss';

import parentsAvatar from '../../images/avatar/parents@2x.png';
import childAvatar from '../../images/avatar/children@2x.png';
export default class Index extends Component {
  config = {
    navigationBarTitleText: '云家付'
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleNext() {
    Taro.navigateTo({
      url: 'pages/apply/apply'
    });
  }

  render() {
    return (
      <View className="container">
        <Header text="云家付" />
        <Text className="title">替家人开通云家付</Text>
        <Text className="slogan">申请信用卡附属卡，家人消费我买单</Text>
        <View className="roles">
          <Text className="select-text">选择你要开通的家人</Text>
          <View className="role-wrapper">
            <View className="role-item left">
              <Image className="avatar" src={parentsAvatar} />
              <Text className="role-text">父母</Text>
            </View>
            <View className="role-item">
              <Image className="avatar" src={childAvatar} />
              <Text className="role-text">子女</Text>
            </View>
          </View>
        </View>
        <View className="next-btn" onClick={this.handleNext}>
          下一步
        </View>
      </View>
    );
  }
}
