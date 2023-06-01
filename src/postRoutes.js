const postRouter = require('express').Router();
const postModel = require('./model');
const multer = require('multer');

// Set up the Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the directory where uploaded files will be stored
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Set the file name to be the original file name
    cb(null, file.originalname);
  }
});

// Create the Multer instance with the configured storage options
const upload = multer({ storage: storage });

postRouter.get('/posts', upload.single('image') ,(req,res)=>{
    const file = req.file;
    // const imageUrl = file.path;
    
})


postRouter.post('/post', (req,res)=>{

})

module.exports = postRouter
`${date.getFullYear()} / ${date.getMonth()} / ${date.getDate()}`