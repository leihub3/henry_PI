const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../api/src/storage')
    },
    filename: function (req, file, cb) {
      const type = file.mimetype.split('/');
      var fileType;
      switch(type[1].toString()){
          case 'jpg':
          fileType = '.jpg';
          break;
          case 'png':
          fileType = '.png';
          break;    
          default:
          fileType = '.pdf';
          break;
      }  
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + fileType)
    }
  })

  const upload = multer({ storage })

module.exports = upload