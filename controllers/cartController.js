const cartService = require("../services/cartService");

exports.addToCart = (req,res) => {

  cartService.addToCart(req.body).then((response) =>{
    res.send(response);
  })
  .catch((err) => {
    res.send(err);
    console.log(err,'err');
  })
}


exports.getCartDetails = (req,res) => {
console.log(req.query.id,'req.query.id')
  cartService.getCartDetails(req.query.id).then((response) =>{
    res.send(response);
  })
  .catch((err) => {
    res.send(err);
    console.log(err,'err');
  })
}
