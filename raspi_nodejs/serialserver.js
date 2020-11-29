const SerialPort = require('serialport')

const port = new SerialPort('/dev/ttyACM0', {
  baudRate: 9600
})



function sendArg(num, letter){

  let sendstring = "";
  sendstring = num+"/"+letter+"\n";

  port.write(sendstring, function(err){
    if(err){
      console.log("error on send");
      console.log("should send : ", sendstring);
    }
    console.log("messenge sent : ", sendstring);
  })
}

module.exports.sendArg = sendArg;




