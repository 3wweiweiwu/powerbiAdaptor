let app = require('../../app.js');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);

exports.getProducts=function(){
    return new Promise((resolve,reject)=>{

        chai.request(app)
            .get('/aha/products')
            .end((err,res)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(res);
                }
            })        
    })

}

exports.getFeatures=function(){
    return new Promise((resolve,reject)=>{

        chai.request(app)
            .get('/aha/features')
            .end((err,res)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(res);
                }
            })        
    })

}