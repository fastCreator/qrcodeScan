//访问用户媒体设备的兼容方法
function getUserMedia(constrains, success) {
  let error = (err) => { console.error('API:getUserMedia,' + err) }
  if (navigator.mediaDevices.getUserMedia) {
    //最新标准API
    navigator.mediaDevices.getUserMedia(constrains).then(success).catch(error);
  } else if (navigator.webkitGetUserMedia) {
    //webkit内核浏览器
    navigator.webkitGetUserMedia(constrains).then(success).catch(error);
  } else if (navigator.mozGetUserMedia) {
    //Firefox浏览器
    navagator.mozGetUserMedia(constrains).then(success).catch(error);
  } else if (navigator.getUserMedia) {
    //旧版API
    navigator.getUserMedia(constrains).then(success).catch(error);
  }
}


function video(streamVideo) {
  const width = 300
  const height = width * streamVideo.clientWidth / streamVideo.clientHeight
  return new Promise((resolve, reject) => {
    const constraints = {
      audio: false,
      video: {
        width: width,
        height: height,
        facingMode: { exact: "environment" }
      }
    };
    getUserMedia(constraints, function (stream) {
      streamVideo.srcObject = stream;
      streamVideo.play();
      resolve(stream)
    })
  })
}

function stop(mediaStream) {
  mediaStream.getTracks().forEach(track => {
    track.stop();
  });
}

export default {
  video: video,
  stop: stop
}