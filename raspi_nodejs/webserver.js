const express = require('express');
const ardserial = require("./serialserver.js");
const app = express();
const bodyParser = require('body-parser');
const pihardware = require("./hardware.js");
const path = require("path");
const fs = require("fs");
const port = 8080;


app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  console.log("root page");
  res.sendFile(path.join(__dirname + '/public/index.html'));
});


app.post("/send", function(req,res){
  console.log("send data");

  let num = req.body.digit;
  let letter = req.body.letter;

  res.set('Content-Type', 'text/html');
  // for exceptions
  if(num < 0 || num > 10){
    // alert("number should be 0 ~ 9");
    res.write("<p style=\"color:red\"> number sould be 0 ~ 9 </p>");
    res.end();
  }
  else if(letter.length > 16 || letter.length < 0){
    // alert("letter should be 1 ~ 16 chars");
    res.write("<p style=\"color:red\"> letter should be 1 ~ 16 chars </p>");
    res.end();
  }
  else{
    ardserial.sendArg(num.toString(), letter);
    res.redirect("/");
  }

});

app.get("/snap", function(req, res){
  
    pihardware.fgetSnap(function(fname){
    	console.log("result: ", fname);
        fs.readFile("./snaps/img" + fname  + ".jpg", function (err, data) {
            if (err) throw err;
            res.write(data);
	    res.end();
        });
    });
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});









