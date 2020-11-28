const PiCamera = require('pi-camera');
const { StillCamera } = require("pi-camera-connect");
const stillCamera = new StillCamera();
const fs = require('fs');
var img_num = 0;

const myCamera = new PiCamera({
  mode: 'photo',
  output: `${ __dirname }/snaps/test.jpg`,
  width: 640,
  height: 480,
  nopreview: true,
});


var takeSnap = stillCamera.takeImage().then(image => {

        fs.writeFileSync("./snaps/img" + ".jpg", image);
	//callback("result");
        img_num = img_num+1; 
   });

function fgetSnap(callback){

        stillCamera.takeImage().then(image => {
		
		console.log("saving image : " + "./snaps/img" + img_num.toString() + ".jpg");
        	fs.writeFileSync("./snaps/img" + img_num.toString() + ".jpg", image);
		//callback("result");
		callback(img_num);
        	img_num = img_num+1;
   	});
}


exports.takeSnap = takeSnap;
module.exports.fgetSnap=fgetSnap;

