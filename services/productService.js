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
  console.log(productInfo,'info')
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

// 
// function getProductInfo(productList){
//   return new Promise((resolve, reject) => {
//     const list = [];
//
//    productList.forEach((product) => {
//         Product.findOne({_id: product.productId}).then((res) => {
//         console.log(res,'result')
//         product.amount = res.amount;
//         product.name = res.name;
//         list.push(product);
//         return resolve(list);
//       })
//     })
//     Promise.all(list).then(data => {
//       console.log(data,'data')
//       return resolve(data);
//
//     })
//   });
// }


module.exports ={
  addProduct,
  getAllProducts,
  updateProduct,
}
