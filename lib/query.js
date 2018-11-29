function build(el) {
  let obj = {
    el: el || document,
    isShow() {
      return window.getComputedStyle(this.el).display !== 'none'
    },
    hide() {
      this.el.style.display = 'none'
      return this
    },
    show() {
      this.el.style.display = null
      if (!this.isShow()) {
        this.el.style.display = 'initial'
      }
      return this
    },
    toggle() {
      if (this.isShow()) {
        this.hide()
      } else {
        this.show()
      }
      return this
    },
    on(event, cb) {
      this.el.addEventListener(event, cb)
      return this
    },
    click(cb) {
      return this.on('click', cb)
    },
    remove(event, cb) {
      this.el.removeEventListener(event, cb)
      return this
    }
  }
  let fn = function (selector) {
    return build(obj.el.querySelector(selector))
  }
  return Object.assign(fn, obj)
}

export default build()
