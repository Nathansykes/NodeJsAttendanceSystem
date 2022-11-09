let chai = require('chai');
let chaiHttp = require('chai-http');
const e = require('express');
let server = require('../app');
let should = chai.should();
 
chai.use(chaiHttp);
//the parent block
describe('backend root', () => {
    it('it should return a 200', () => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
            });
    });

    it('it should return a 404', () => {
        chai.request(server)
            .get('/wrong')
            .end((err, res) => {
                res.should.have.status(404);
            });
    });
});