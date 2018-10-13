import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image, Input } from '@tarojs/components';
import Header from '../../components/header/header';
import './amount.scss';

import parentsAvatar from '../../images/avatar/parents@2x.png';
import childAvatar from '../../images/avatar/children@2x.png';
import cls from 'classnames';

import global from '../../global';

export default class Amount extends Component {
  config = {
    navigationBarTitleText: '设置月额度'
  };

  constructor(props) {
    super(props);
    this.state = {
      avatar: parentsAvatar || childAvatar,
      name: '*军',
      role: '父亲',
      amount: ''
    };
  }

  componentWillMount() {
    this.info = global.get('applyInfo') || {};
    this.user = global.get('user') || {};
    const name = this.info.minorName;
    const role = this.info.role;
    const avatar = this.info.role == '父亲' ? parentsAvatar : childAvatar;
    this.setState({name, role, avatar});
  }


  handleAmountChange(e) {
    const amount = e.detail.value;
    this.setState({amount});
  }


  handleNext() {
    const {amount} = this.state;
    if (!amount) return;
    Taro.showLoading({
      title: '正在申请...',
    });
    this.info.credit_line = parseInt(amount);
    const card = this.user.card_list[0];
    this.info.mainId = card.main_id;
    console.log(this.info);
    global.post('applycard', this.info).then(res => {
      Taro.hideLoading();
    });
    Taro.navigateTo({
      url: '../status/status'
    });
  }

  render() {
    const { ...states } = this.state;

    const nameText = states.name + '(' + states.role + ')';
    const labelText = '给' + states.role + '的消费上限';

    const btnStyle = cls({
      'next-btn': true,
      'disabled': !states.amount,
    })

    return (
      <View className="container">
        <Header text={this.config.navigationBarTitleText} />
        <Image className="avatar" src={states.avatar} />
        <Text className="role-name">{nameText}</Text>
        <View className="amount-main">
          <Text className="label">{labelText}</Text>
          <View className="form-container">
            <View className="input-line">
              <Text className="input-label">金额</Text>
              <View className="input-content">
                <Input
                  placeholder="1-2000"
                  value={states.amount}
                  type="number"
                  onChange={this.handleAmountChange.bind(this)}
                />
              </View>
              <Text className="input-label right">元/月</Text>
            </View>
          </View>
          <View className="protocol">
            <Text className="protocol-text">阅读并同意:</Text>
            <Text className="protocol-link">《云家付服务协议》</Text>
          </View>
        </View>
        <View
          className={btnStyle}
          onClick={this.handleNext.bind(this)}
        >
          申请开通
        </View>
      </View>
    );
  }
}
