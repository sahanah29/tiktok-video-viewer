"use strict"

//A static server using Node and Express

const express = require("express");
const fetch = require("cross-fetch");
const app = express();

/* set up server pipeline to handle requests */

// print incoming url on console
app.use(function(req, res, next) {
  console.log(req.method,req.url);
  next();
})

// make all the files in '/public' available on the Web
app.use(express.static("public"));

// when there is nothing following the slash in the url, return the main page of the app.

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/public/videoViewer.html");
});

app.get("testURL", 
        function (req,res) {
          console.log(req.params);
          let url = req.params.url;
          next();
        } )

// final pipeline state - file not found
app.use(function(req, res, next){
  console.log("send 404 response");
  res.status(404);
  // otherwise respond with plain-text. 
  res.type('txt').send('File not found');
});  // app.use

/* pipeline is now all set up */

// listen for requests :)
const listener = app.listen(3000, function() {
  console.log("The static server is listening on port " + listener.address().port);
});
