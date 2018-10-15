import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './header.scss'

import backImg from '../../images/nav_bar/back_black@2x.png'
// import moreImg from '../../images/nav_bar/more_black@2x.png'

export default class Header extends Component {

  handleNavBack() {
    const {route} = this.props;
    console.log(route);
    Taro.navigateBack();
    // if (route && route.url.indexOf('main/list') > -1) {
    //   Taro.redirectTo({
    //     url: '/#/pages/home/home'
    //   });
    // } else {
    //   Taro.navigateBack();
    // }
  }

  render() {
    const {text} = this.props;
    const isH5 = process.env.TARO_ENV === 'h5';
    console.log(isH5);
    const header = isH5 ? (
      <View className='wrapper'>
        <Image
          className='nav-icon back'
          onClick={this.handleNavBack.bind(this)}
          src={backImg}
        >
        </Image>
        <Text
          className='nav-text'
        >
          {text}
        </Text>
        {/* <Image
          className='nav-icon more'
          src={moreImg}
        >
        </Image> */}
      </View>
    ) : '';
    return (
      <View>
        {header}
      </View>
    )
  }
}
