let request=require('request');
let config=require('../../config')

let getProduct=function(productName){
    let productPath=config.aha.api_path+config.aha.api_product+`/${productName}`+config.aha.access_token;
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

getAllProduct=function(productPrefix){
    //use recursive function to get all product for the children
    return new Promise((resolve,reject)=>{
        getProduct(productPrefix)
            .then((product)=>{
                
                let promiseChain=[];
                let lsResult=[];
                let children=product.product.children
                
                //loop through 
                children.forEach(function(element) {
                    if(product.product.children[0].product_line){
                        //if it is a product line, then keep drilling in
                        promiseChain.push(getAllProduct(element.reference_prefix));
                    }
                    else{
                        //if it is not a product line, then we are good for now
                        lsResult.push(element);
                    }
                    
                });

                Promise.all(promiseChain)
                    .then(resultsFromChildren=>{

                        
                        //merge children's result with self result
                        resultsFromChildren.forEach(item=>{
                            item.forEach(product=>{
                                lsResult.push(product);
                            })
                                
                            
                            
                        })

                        resolve(lsResult);
                    })
                    .catch(err=>{
                        reject(err);
                    })

                
            })
    })

}

exports.getProducts=function(){
    
    return getAllProduct('AT');

}