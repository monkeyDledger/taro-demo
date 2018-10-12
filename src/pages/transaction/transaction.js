import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import Header from '../../components/header/header';
import Bill from '../../components/bill/bill';
import './transaction.scss';

import topImg from '../../images/slide@2x.png';
import smileIcon from '../../images/icons/smile@2x.png';
import peaceIcon from '../../images/icons/peace@2x.png';
import sadIcon from '../../images/icons/sad@2x.png';
import avatar from '../../images/avatar/parents@2x.png';
import bubbleImg from '../../images/bubble@2x.png';
export default class Transaction extends Component {
  config = {
    navigationBarTitleText: '交易详情'
  };

  constructor(props) {
    super(props);
    this.state = {
      expression: 0,
      commentIcon: null,
      role: '儿子',
      roleName: '*军',
      userName: '*阳',
      bills: [
        {
          label: '商户名称',
          text: '上海楚阳餐饮管理有限公司'
        },
        {
          label: '卡号',
          text: '建设银行 6298 **** 3456'
        },
        {
          label: '时间',
          text: '2018.01.30  12:19'
        },
        {
          label: '分类',
          text: '服务-政府服务'
        },
        {
          label: '支出金额',
          text: '7.50'
        },
        {
          label: '备注',
          text: '今天和爸爸在公司食堂喝早茶。'
        }
      ]
    };
  }

  componentWillMount() {
    const params = this.$router.params;
    // const expression = params.expression;
    const expression = 1;
    if (expression) {
      const commentIcon =
        expression === 1 ? smileIcon : expression === 2 ? peaceIcon : sadIcon;
      this.setState({ commentIcon, expression });
    } else {
    }
  }

  render() {
    const { ...states } = this.state;
    const expressionTitle =
      '对' + states.role + states.roleName + '的消费进行评价';

    const expressionEle = !states.expression ? (
      <View className="expression-container">
        <Text className="expression-title">{expressionTitle}</Text>
        <View className="expression-icons">
          <Image className="expression-icon" src={smileIcon} />
          <Image className="expression-icon" src={peaceIcon} />
          <Image className="expression-icon right" src={sadIcon} />
        </View>
        <View className="expression-confirm">确认</View>
      </View>
    ) : (
      <View className="comment-container">
        <Image className="comment-avatar" src={avatar} />
        <Text className="comment-name">{states.userName}</Text>
        <View className="comment-detail">
          <Image className="comment-icon" src={states.commentIcon} />
          <Text className="comment-text">来自您的评价</Text>
        </View>
      </View>
    );

    return (
      <View className="container">
        <Header text={this.config.navigationBarTitleText} />
        <View className="transaction-main">
          <Image className="top-img" src={topImg} />
          {expressionEle}
          <Bill data={states.bills} />
        </View>
      </View>
    );
  }
}
