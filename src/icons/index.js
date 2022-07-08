// 1.导入所有的svg
// 2.完成 svgicon 的全局注册

import SvgIcon from '@/components/SvgIcon'


// require.context => webpack 方法
const svgRequire = require.context('./svg',false,/\.svg$/)
// 此时返回了一个Require函数，可以接收一个，request的参数，用于require 的导入
// 该函数提供了三个属性，可以通过svgRequire.keys() 获得所有的svg图标
// 遍历图标，吧图标作为 request 参数导入到svgRequire导入函数中，，完成本地svg图标的导入

svgRequire.keys().forEach(svgIcon => svgRequire(svgIcon));



export default app =>{
    app.component('SvgIcon',SvgIcon)
}