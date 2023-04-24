export const imgerror = {
  inserted(el, binding) {
    // 当使用了这个自定义指令的标签被渲染的时候，就会执行inserted钩子
    // el,表示的是使用了这个指令的标签
    // binding 使用指令的时候传过来的标签
    el.onerror = function() {
      // 如果执行了onerror 说明图片 加载失败
    }
    el.src = binding.value
  }
}

export const color = {
  inserted(el, binding) {
    el.style.color = binding.value
  }
}
