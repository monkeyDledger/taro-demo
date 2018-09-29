import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '云家付'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='container'>
        <Text className='title'>替家人开通云家付</Text>
        <View className='roles'>
          <Image></Image>
          <Image></Image>
        </View>
      </View>
    )
  }
}

