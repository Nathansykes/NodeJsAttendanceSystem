let chai = require('chai');
let chaiHttp = require('chai-http');
const e = require('express');
let server = require('../app');
let should = chai.should();
let Module = require('../models/module.model');

chai.use(chaiHttp);


var tutorToken;
var studentToken;

var studentLogin = {
    Id: "1000",
    Password: "password"
};
var tutorLogin = {
    Id: "1010",
    Password: "password"
};

describe('login a student', () => {
    it('it should login a student', (done) => {
        chai.request(server)
            .post('/login')
            .send(studentLogin)
            .end((err, res) => {
                var body = JSON.parse(res.body);
                studentToken = body.Token;
                done();
            });
    });
});


describe('Login a tutor', () => {
    it('it loggin a tutor', (done) => {
        chai.request(server)
            .post('/login')
            .send(tutorLogin)
            .end((err, res) => {
                var body = JSON.parse(res.body);
                tutorToken = body.Token;
                done();
            });
    });
});

describe('DELETE session as student', () => {
    it('it should return 403', (done) => {
        chai.request(server)
            .delete('/sessions/1')
            .auth(studentToken, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(403);
                done();
            });
    });
});


describe('POST course as tutor', () => {
    it('it should return 403', (done) => {
        chai.request(server)
            .post('/courses')
            .auth(tutorToken, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(403);
                done();
            });
    });
});



