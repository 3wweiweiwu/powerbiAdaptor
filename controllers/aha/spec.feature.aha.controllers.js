let app = require('../../app');
let assert=require('assert');
let chai=require('chai');
let chaiHttp = require('chai-http');
let ahaSupport=require('./support.aha.controllers')

chai.use(chaiHttp);
describe('get /feature',()=>{
    it('shall return all the features in aha',done=>{
        ahaSupport.getFeatures()
            .then(features=>{
                assert.equal(features.body.length,53);
                done();
            })
            .catch(err=>{
                done();
            })
    })
})
