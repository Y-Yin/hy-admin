import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入路由鉴权
import './permission'

// 初始化样式表
import '@/styles/index.scss'

// 导入svgIcon
import installIcons from  '@/icons/index.js'

// 导入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'

// 全局过滤器
import installFilter from '@/filters' 

// 使用mock.js 
import '../mock/index' 

const app = createApp(App)
installIcons(app)
installFilter(app)


app.use(ElementPlus, { locale })
app.use(store).use(router).mount('#app')