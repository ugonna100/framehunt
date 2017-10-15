var express = require('express');
var router = express.Router();
var multer  = require('multer');
var fs = require('fs');
var ytdl = require('ytdl-core');
var cors = require('cors');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/videos/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({ 
  storage: storage,
  limits: {fileSize: 9 * 1000000}
});


var counter = 0;

// Upload video to public folder and return filename
router.get('/ytupload', cors(), function(req, res, next) {
    var filename =  "video" + counter + ".mp4";
    counter += 1;
    ytdl(req.query.url)
      .pipe(fs.createWriteStream("../public/videos/" + filename));
    res.send(filename);
});

// Get byte stream for video
router.post('/upload', cors(), upload.single('video'), function(req, res, next) {
    var video = req.file;
    res.send(video.path);
});

module.exports = router;
