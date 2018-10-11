import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import cls from 'classnames';

import Header from '../../components/header/header';
import './index.scss';

import parentsAvatar from '../../images/avatar/parents@2x.png';
import childAvatar from '../../images/avatar/children@2x.png';

export default class Index extends Component {
  config = {
    navigationBarTitleText: '云家付'
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedType: 0
    };
  }

  handleRoleSelected(selectedType) {
    this.setState({ selectedType });
  }

  handleNext() {
    Taro.navigateTo({
      url: 'pages/apply/apply'
    });
  }

  render() {
    const { selectedType } = this.state;
    const parentAvatarStyle = cls({
      avatar: true,
      selected: selectedType === 1
    });
    const childAvatarStyle = cls({
      avatar: true,
      selected: selectedType === 2
    });

    return (
      <View className="container">
        <Header text="云家付" />
        <Text className="title">替家人开通云家付</Text>
        <Text className="slogan">申请信用卡附属卡，家人消费我买单</Text>
        <View className="roles">
          <Text className="select-text">选择你要开通的家人</Text>
          <View className="role-wrapper">
            <View
              className="role-item left"
              onClick={this.handleRoleSelected.bind(this, 1)}
            >
              <Image className={parentAvatarStyle} src={parentsAvatar} />
              <Text className="role-text">父母</Text>
            </View>
            <View
              className="role-item"
              onClick={this.handleRoleSelected.bind(this, 2)}
            >
              <Image className={childAvatarStyle} src={childAvatar} />
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
