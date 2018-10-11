import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'

import './game.scss'

import checkedIcon from '../../images/form/check@2x.png'
import uncheckedIcon from '../../images/form/uncheck@2x.png'

/**
 * 游戏列表项
 */
export default class Game extends Component {

  render () {
    const {...data} = this.props;
    const rightIcon = data.checked ? checkedIcon : uncheckedIcon;

    return (
      <View className="game" onClick={data.onItemClick}>
        <Image className="game-logo" src={data.logo}></Image>
        <Text className="game-name">{data.name}</Text>
        <Image className="game-checkbox" src={rightIcon} />
      </View>
    );
  }
}
