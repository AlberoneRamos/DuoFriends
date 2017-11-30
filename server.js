var express = require('express');
const compression = require("compression");

var app = express();
const PORT = process.env.PORT || 3000;

function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }

  // fallback to standard filter function
  return compression.filter(req, res)
}

app.use(express.static("public"));

app.use(express.static('assets/'));

app.use(express.static('/'));

app.use(compression({
  level: 2,               // set compression level from 1 to 9 (6 by default)
  filter: shouldCompress, // set predicate to determine whether to compress
}));



app.listen(PORT, function(){
    console.log('Express server is up on port ' + PORT);
});
