let chai = require('chai');
let chaiHttp = require('chai-http');
const e = require('express');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

// THIS TEST MUST RUN FIRST TO GET A AUTH TOKEN
//login a user
global.token = undefined;

describe('POST /Login - Incorrect details', () => {
    var incorrectLogin = {
        Id: "1000",
        Password: "anIncorrectPassword"
    };
    it('it should fail to login', (done) => {
        chai.request(server)
            .post('/login')
            .send(incorrectLogin)
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.have.property('message');
                done();
            });
    });
});


describe('POST /login', () => {
    var login = {
        Id: "1000",
        Password: "password"
    };
    it('it should login an user ', (done) => {
        chai.request(server)
            .post('/login')
            .send(login)
            .end((err, res) => {
                var body = JSON.parse(res.body);
                res.should.have.status(200);
                body.should.have.property('Token');
                token = body.Token;
                done();
            });
    });
});

//the parent block
describe('backend root', () => {
    it('it should return a 200', () => {
        chai.request(server)
            .get('/')
            .auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200);
            });
    });

    it('it should return a 404', () => {
        chai.request(server)
            .get('/wrong')
            .auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(404);
            });
    });
});
