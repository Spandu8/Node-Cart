const productService = require("../services/productService");
const multer = require('multer');


var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + file.originalname);
  }
}); 

const upload = multer({storage: storage}).single('fileUpload');

exports.addProduct = (req,res) => {
    upload(req,res, function(err) {
      if(err) {
        res.send(error);
      } else{
      if(!req.body.name || !req.body.amount){
        res.send({
          code: 403,
          message: "Name and amount are required"
        })
      }
      productService.addProduct(req.body, req.file).then((response) =>{
        res.send(response);
      })
      .catch((err) => {
        res.send(err);
      })
    }
  })


}

exports.getAllProducts = (req, res) => {
  productService.getAllProducts(req.query.userId).then((response) => {
    res.send(response);
  }).catch((error) => {
    res.send(error);
  })
}

exports.updateProduct = (req,res) => {
  if(!req.body.name || !req.body.amount){
    res.send({
      code: 403,
      message: "Name and amount are required"
    })
  }
  productService.updateProduct(req.body).then((response) =>{
    res.send(response);
  })
  .catch((err) => {
    res.send(err);
  })
}

exports.deleteProduct = (req,res) => {
  productService.deleteProduct(req.query.id).then((response) => {
    res.send(response);
  }).catch((error) => {
    res.send(error);
  })
}
