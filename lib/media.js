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
//加载视频
function video(streamVideo) {
  return new Promise(async (resolve, reject) => {
    const constraints = await getConstraints()
    getUserMedia(constraints, function (stream) {
      streamVideo.srcObject = stream;
      streamVideo.play();
      resolve(stream)
    })
  })
}
//兼容性获取视频流配置项
async function getConstraints() {
  const constraints = {
    audio: false,
    video: {
      width: { max: 400 },
      height: { max: 280 }
      // facingMode: { exact: "environment" }  //标准写法
    }
  };
  let devices = await navigator.mediaDevices.enumerateDevices()
  let videoinput = devices.filter(it => it.kind === 'videoinput')
  if (videoinput[1]) {
    constraints.video.deviceId = { exact: videoinput[1].deviceId || videoinput[0].deviceId }
  }
  return constraints
}
//停止视频
function stop(mediaStream, video) {
  video.pause()
  mediaStream.getTracks().forEach(track => {
    track.stop();
  });
}

export default {
  video: video,
  stop: stop
}