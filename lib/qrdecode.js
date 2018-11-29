import Worker from './parse.worker'

export default (video) => {
  let canvas = getCanvas(video)
  let ctx = canvas.getContext('2d')
  let myWorker = new Worker();
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      parse(resolve, myWorker, ctx, canvas, video)
    }, 1000);
  })
}

function getCanvas(video) {
  var canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  return canvas
}

function parse(resolve, myWorker, ctx, canvas, video) {
  drawImage(ctx, canvas, video)
  myWorker.postMessage(canvas.toDataURL());
  myWorker.onmessage = function (e) {
    if (e.data !== 'null') {
      resolve(e.data)
    } else {
      parse(resolve, myWorker, ctx, canvas, video)
    }
  }
}

function drawImage(ctx, canvas, video) {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
}
