import Worker from './parse.worker'

export default (video) => {
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext('2d')
  let myWorker = new Worker();
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      parse(resolve, myWorker, ctx, canvas, video)
    }, 1000);
  })
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
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
}
