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
  productService.getAllProducts().then((response) => {
    res.send(response);
  }).catch((error) => {
    res.send(error);
  })
}

exports.updateProduct = (req,res) => {
  console.log(req.body,'body')
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
