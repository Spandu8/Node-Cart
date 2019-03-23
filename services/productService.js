const Product = require("../models/productModel");

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

function getAllProducts() {
  return new Promise((resolve, reject) =>{
    Product.find().then((productInfo) => {
      return resolve(productInfo);
    }).catch((err) => {
      return reject({
        code: 500,
        message: 'Internal Server Error'
      })
    })
  });
}


module.exports ={
  addProduct,
  getAllProducts,
  updateProduct,
}
