const PiCamera = require('pi-camera');
const { StillCamera } = require("pi-camera-connect");
const stillCamera = new StillCamera();
const fs = require('fs');
const Gpio = require("pigpio").Gpio;


var buzzer = new Gpio(2, {mode: Gpio.OUTPUT});
var img_num = 0;
let dutycycle = 0;

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
		ring();
   	});
}


function ring(){
	
	let i = 0;
	for(i = 0; i < 5; i++){
		for (dutycycle = 0; dutycycle < 100000; dutycycle++){

			buzzer.pwmWrite((i+1)*30);
			
		}
	}
	buzzer.digitalWrite(0);
}

exports.takeSnap = takeSnap;
module.exports.fgetSnap=fgetSnap;

