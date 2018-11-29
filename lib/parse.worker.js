import qrcodeParser from './qrcode-parser'

onmessage = function (e) {
  console.log(1111111111111)
  qrcodeParser(e.data).then(d => {
    postMessage(JSON.stringify(d));
  }).catch(err => {
    postMessage('null');
  })
};