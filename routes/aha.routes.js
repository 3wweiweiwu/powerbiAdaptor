var express = require('express');
var router = express.Router();
let productController=require('../controllers/aha/products.aha.controllers')
let featureController=require('../controllers/aha/feature.aha.controllers')

//get all features from aha

router.get('/products',function(req,res,next){
    //it shall get all the products from aha link
    productController.getProducts()
        .then((products)=>{
            res.status(200).json(products);
        })
        .catch(err=>{
            res.status(500).json(err);
        })
    
});
router.get('/features',function(req,res,next){
    //it shall get all the features in the aha
    featureController.getFeatures()
        .then((features)=>{
            res.status(200).json(features);
        })
        .catch(err=>{
            res.status(500).json(err);
        });
});
module.exports = router;