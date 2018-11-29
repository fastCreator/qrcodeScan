import $ from './query'
import media from './media'
import qrdecode from './qrdecode'
import './index.less'

export default (o) => {
  initHtml()
  openCamera(o.success)
  initEvent()
}

function initHtml() {
  let height = document.documentElement.clientHeight
  let width = document.documentElement.clientWidth
  let cw = width * 0.7
  let topHeight = (height - cw) / 2
  let root = document.createElement('div')
  root.classList.add('qrcodeScan')
  root.innerHTML = `
  <video></video>
  <div class="header" style="height:${topHeight}px;">
    <span class="back">&lt;</span>
    <span class="title">二维码</span>
    <span class="most">···</span>
  </div>
  <div class="main" style="height:${cw}px;">
    <div class="maskleft"></div>
    <div class="center">
      <div class="line"></div>
      <div class="horn hornlt"></div>
      <div class="horn hornrt"></div>
      <div class="horn hornlb"></div>
      <div class="horn hornrb"></div>
    </div>
    <div class="maskright"></div>
  </div>
  <div class="maskbottom" style="height:${topHeight}px;">
    <div class="text">将二维码放入框内，可自动扫描</div>
  </div>
  <div class="maskAll">
    <div class="mostbtn">
      <div class="item">从相册选取二维码</div>
    </div>
  </div>`
  document.body.appendChild(root)
}

function openCamera(success) {
  let $$ = $('.qrcodeScan')
  let video = $$('video').el
  media.video(video)
  qrdecode(video).then(data => {
    media.stop(video)
    if (success) {
      success(data)
    }
  })
}

function initEvent() {
  let $$ = $('.qrcodeScan')
  $$('.header .most').click(() => {
    $$('.maskAll').show()
  })
  $$('.maskAll').click(() => {
    $$('.maskAll').hide()
  })
}
