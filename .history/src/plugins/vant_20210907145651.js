// 按需全局引入 vant组件
import Vue from 'vue'
import { ActionSheet, Button, Cell, CellGroup, Divider, Field, Icon, List, NavBar, Progress, PullRefresh, Uploader, } from 'vant'
Vue.use(Button).use(NavBar).use(Progress).use(Icon).use(Divider).use(List).use(CellGroup).use(Cell).use(Field).use(Uploader).use(PullRefresh).use(ActionSheet)
