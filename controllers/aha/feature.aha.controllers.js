let request=require('request');
let config=require('../../config')
let productControl=require('./products.aha.controllers')


let getFeatureWithRestAPI=function(productName){
    let productPath=config.aha.api_path+config.aha.api_product+`/${productName}/features`+config.aha.access_token;
    return new Promise((resolve,reject)=>{
        request.get(productPath,function(err,res,body){
            if(err){
                reject(err);
                return;
            }

            if(res.statusCode==200){
                let jsonObj=JSON.parse(body)
                resolve(jsonObj);
            }
        });
    })    
}

exports.getFeatures=function(){
    return new Promise((resolve,reject)=>{
        productControl.getProducts()
            .then(products=>{                
                let promiseChain=[];
                let lsResult=[];
                //go through all the products to generate the promise
                products.forEach(function(item) {
                    promiseChain.push(getFeatureWithRestAPI(item.reference_prefix));
                });

                //wait until all promise return its value
                Promise.all(promiseChain)
                    .then(results=>{
                        results.forEach(item=>{
                            lsResult.push(item);
                        })
                        resolve(lsResult);
                    })
                    .catch(err=>{
                        reject(err);
                    })


            })
    });

    

}