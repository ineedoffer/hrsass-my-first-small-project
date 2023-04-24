import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets 重置默认样式

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'// 设置elementui组件的样式
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import request from '../src/utils/request'
import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'
import * as directives from '@/directives'

import '@/icons' // icon
import '@/permission' // permission control

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$request = request
// 固定语法 process.env 访问环境变量
for (const key in directives) {
  Vue.directive(key, directives[key])
}

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
