import qrcodeParser from './qrcode-parser'

onmessage = function (e) {
  qrcodeParser(e.data).then(d => {
    postMessage(JSON.stringify(d));
  }).catch(err => {
    postMessage('null');
  })
};