let app = require('../../app');
let assert=require('assert');
let chai=require('chai');
let chaiHttp = require('chai-http');
let ahaSupport=require('./support.aha.controllers')

chai.use(chaiHttp);
describe('get /products',()=>{
    it('shall return all the products in aha',done=>{
        ahaSupport.getProducts()
            .then(products=>{
                assert.equal(products.body.product.reference_prefix,"AT");
                done();
            })
            .catch(err=>{
                done();
            })
    })
})

