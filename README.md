> 基于taro的demo

环境

- taro-cli

  通过taro-cli新建项目后，编译会报缺少相关库。如h5会报缺少rimraf，weapp会报缺少object-assign。实际上，package.json中的依赖都已安装。原因在于这些依赖是taro-cli需要的，可能全局安装taro-cli时没安装完整，再分别全局安装需要的依赖，问题解决。
- 设计尺寸

  taro在config中默认的设计尺寸是750px。若实际设计稿是350px，修改如下：
      designWidth: 375,
      deviceRatio: {
          '640': 2.34 / 2,
          '750': 1,
          '375': 0.5,
          '828': 1.81 / 2
      },
- px转rem

  Taro默认会将所有px转为对应rem值，但有的时候，rem转化为小数位很多，会带来问题。例如通过border-radius画圆。
  解决方法是，需要忽略的地方，写成Px或PX。
- 小程序编译

  开发调试是用的dev:h5模式，当去编译weapp时，发现报错了，部分页面失败。
  原因：Taro的组件中，render函数里，不能用对象的解构写法，类似const {...states} = this.state; const {...props} = this.props这种。只能const {name, title} = this.props



