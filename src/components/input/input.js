import Taro, { Component } from '@tarojs/taro'
import {View, Text, Switch} from '@tarojs/components'

import '../input/input.scss'

export default class CardInput extends Component {
  render() {
    const {label, type} = this.props;

    let input;
    if (type === 'switch') {
      input = (
        <Switch></Switch>
      )
    }
    return (
      <View>
        <Text className='text'>{label}</Text>
      </View>
    )
  }
}
