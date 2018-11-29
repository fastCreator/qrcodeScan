import jsQR from 'jsqr'
import UPNG from 'upng-js'



function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

function blob2text(blob) {
  return new Promise((resolve, reject) => {
    const myReader = new FileReader()
    myReader.readAsArrayBuffer(blob)
    myReader.addEventListener('loadend', e => {
      const buffer = e.srcElement.result // arraybuffer object
      const img = UPNG.decode(buffer) // put ArrayBuffer of the PNG file into UPNG.decode
      const rgba = UPNG.toRGBA8(img)[0] // UPNG.toRGBA8 returns array of frames, size: width * height * 4 bytes.
      const code = jsQR(new Uint8ClampedArray(rgba), img.width, img.height)
      if (code) {
        resolve(code)
      } else {
        reject(new Error('decode failed'))
      }
    })
  })
}

export default (base64) => {
  let blob = dataURLtoBlob(base64)
  return blob2text(blob)
}