const productService = require("../services/productService");

exports.addProduct = (req,res) => {
  if(!req.body.name || !req.body.amount){
    res.send({
      code: 403,
      message: "Name and amount are required"
    })
  }
  productService.addProduct(req.body).then((response) =>{
    res.send(response);
  })
  .catch((err) => {
    res.send(err);
    console.log(err,'err');
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
    console.log(err,'err');
  })
}

exports.deleteProduct = (req,res) => {
  productService.deleteProduct(req.query.id).then((response) => {
    res.send(response);
  }).catch((error) => {
    res.send(error);
  })
}
