const Cart = require("../models/cartModel");
const productService = require("../services/productService");


function addToCart(data){
    return new Promise((resolve,reject) => {
      const cart = new Cart(data);
      cart.save(data).then((res) => {
        return resolve({
          message: "Product added to cart successfully"
        });
      }).catch((err) => {
        return reject({
          code: 500,
          message: 'Internal Server Error'
        })
      })

    } )
}

function getCartDetails(id){
    return new Promise((resolve,reject) => {
      Cart.find({userId: id}).then((res) => {
        return resolve(res);
      }).catch((err) => {
        return reject({
          code: 500,
          message: 'Internal Server Error'
        })
      })
    } )
}


module.exports ={
  addToCart,
  getCartDetails
}
