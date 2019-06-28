const cartService = require("../services/cartService");

exports.addToCart = (req,res) => {

  cartService.addToCart(req.body).then((response) =>{
    res.send(response);
  })
  .catch((err) => {
    res.send(err);
  })
}


exports.getCartDetails = (req,res) => {
  cartService.getCartDetails(req.query.id).then((response) =>{
    res.send(response);
  })
  .catch((err) => {
    res.send(err);
  })
}
