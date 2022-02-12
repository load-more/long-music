import mitt, { Emitter } from 'mitt'

/*
  Vue3 从实例中完全删除了 $on、$off 和 $once 方法；
  但 $emit 仍然是现有API的一部分，因为它用于触发由父组件以声明方式附加的事件；
  所以 Vue3 中无法继续沿用 Vue2 的事件总线进行组件通信，推荐使用 mitt 库。
*/
type Events = {
  'onToggleLoginLoading': boolean,
  'onToggleRegisterLoading': boolean,
  'onRefreshGlobalHeader': boolean,
}

const emitter: Emitter<Events> = mitt<Events>()

export default emitter
