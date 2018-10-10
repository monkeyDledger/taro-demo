import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

import './app.scss'

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/amount/amount',
      'pages/apply/apply',
      'pages/status/status',
      'pages/main/list/list',
      'pages/main/limit/limit',
      'pages/main/detail/detail',
      'pages/main/blacklist/blacklist',
      'pages/transaction/transaction',
      'pages/parents/parents',
      'pages/child/index/index',
      'pages/child/plan/plan'
    ],
    window: {
      backgroundTextStyle: 'black',
      navigationBarBackgroundColor: '#f5f5f5',
      navigationBarTitleText: '云家付',
      navigationBarTextStyle: 'black'
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
