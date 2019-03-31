const Product = require("../models/productModel");
const Cart_Service = require("../services/cartService");
var _ = require('lodash');
var ObjectId = require('mongodb').ObjectID;

function addProduct(productInfo){
    return new Promise((resolve,reject) => {
      const product = new Product(productInfo);
      product.save(productInfo).then((res) => {
        return resolve({
          message: "Product added successfully"
        });
      }).catch((err) => {
        return reject({
          code: 500,
          message: 'Internal Server Error'
        })
      })
    } )
}

function updateProduct(productInfo) {
  return new Promise((resolve, reject) => {
      Product.update({_id: productInfo._id},
          { $set:
           {
             amount: productInfo.amount,
             name: productInfo.name
           }
      }).then((res)=>{
          return resolve({
            message: "record updated successfully"
          });
        })
  })
}

function getAllProducts(userId) {
  return new Promise((resolve, reject) =>{
    Product.find().then((productInfo) => {
      if(productInfo.length) {
        return resolve(filterProducts(userId, productInfo));
      }
    }).catch((err) => {
      return reject({
        code: 500,
        message: 'Internal Server Error'
      })
    })
  });
}

function filterProducts(userId, productInfo) {
    return new Promise((resolve, reject) => {
      Cart_Service.getCartDetails(userId).then((res) => {
          productInfo.filter(function (list) {
             return res.some(function (data) {
               return list._id.equals(ObjectId(data.productId)) ? list.isAddedToCart= true : list.isAddedToCart = false;
             });
           });
           return resolve(productInfo);
      }).catch((err) => {
        return reject({
          code: 500,
          message: 'Internal Server Error'
        })
      });
    });
}


module.exports ={
  addProduct,
  getAllProducts,
  updateProduct,
}
