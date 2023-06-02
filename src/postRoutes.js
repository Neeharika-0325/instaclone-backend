const postRouter = require('express').Router();
const postModel = require('./model');
const multer = require('multer');
// const path = require('path');

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

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//       cb(null, path.join(__dirname, 'public/uploads'))
//   },
//   filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, uniqueSuffix + path.extname(file.originalname))
//   }
// })


// let idCount=1;

// Create the Multer instance with the configured storage options
const upload = multer({ storage: storage });
postRouter.get('/',(req,res)=>{
  res.status(200).send('Hello Insta')
})
postRouter.post('/post', upload.single("image") ,(req,res)=>{
    // const file = req.file;
    // let newId = idCount + 1;
    // idCount = newId
    // const random_number = Math.floor(Math.random() * 1000) + 1;
    // const imageUrl = file.path;
    const postData = req.body;
    // console.log(req.file.filename)
    const newPost = new postModel({
      ...postData,
      image: req.file.originalname
      // `uploads/${req.file.filename}`
    })
    newPost.save().then(record=>{
      res.status(200).send({
        status: 'Success',
        message: 'Post uploaded successfully',
        record: record
      })
    }).catch(err=>{
      res.status(400).send({
        status: 'Failure',
        message: err
      })
    })
    
})


postRouter.get('/posts', (req,res)=>{
  postModel.find({}).then(records=>{
    res.status(200).send({
      status: 'Success',
      message: 'posts fetched successfully',
      records: records
    })
  }).catch(err=>{
    res.status(400).send({
      status: 'Failure',
      message: err
    })
  })
})

module.exports = postRouter
