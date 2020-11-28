const PiCamera = require('pi-camera');
const { StillCamera } = require("pi-camera-connect");
const stillCamera = new StillCamera();
const fs = require('fs');


const myCamera = new PiCamera({
  mode: 'photo',
  output: `${ __dirname }/snaps/test.jpg`,
  width: 640,
  height: 480,
  nopreview: true,
});


function takeSnap(callbck){

    stillCamera.takeImage().then(image => {

        fs.writeFileSync("still-image.jpg", image);
	callback("result");
    });
}



module.exports.takeSnap = takeSnap;
