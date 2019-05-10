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
      console.log(productInfo,'productInfo')
      if(productInfo.length) {
        return resolve(filterProducts(userId, productInfo));
      }else{
        console.log(productInfo,'productInfo else')
        return resolve (productInfo);
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

function deleteProduct(productId) {
  return new Promise((resolve,reject) => {
    Product.findOne({_id: productId}).then((res) => {
      Product.deleteOne({_id: productId}).then(() => {
          return resolve({
            message: "Product deleted successfully"
          })
      }).catch((error) => {
          return reject({
            code: 500,
            message: 'Imternal Server Error'
          })
      })

    }).catch((error) => {
      return reject({
        message:'Product does not exist'
      })
    })
  })
}

module.exports ={
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct
}
