let chai = require('chai');
let chaiHttp = require('chai-http');
const e = require('express');
let server = require('../app');
let should = chai.should();
let User = require('../models/user.model');
let Student = require('../models/student.model');

chai.use(chaiHttp);

//Testing GET /users
describe('GET /users', () => {
    it('it should GET all the users', (done) => {
        chai.request(server)
        .get('/users')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('string');
            res.body.length.should.not.be.eql(0);
            done();
        });
    });
});
//Finished GET /users

var userId = "b90214006714";
var userName = "Ben";
//Testing POST /users - positive test
//TODO: Update to cover all UserTypes.
describe('POST /users', () => {
    let user;

    before(function(done) {
        User.find({})
        .then(data => {
            user = {
                Id: userId,
                FirstName: userName,
                LastName: "Jefferson",
                UserType: "Student",
            }; 
            done();
        })
        .catch(err => {
            done(err);
        });
    });
    
    it('it should POST an user ', (done) => {        
        chai.request(server)
            .post('/users')
            .send(user)
            .end((err, res) => {
                const returnedUser = (User)(JSON.parse(res.body));

                res.should.have.status(200);
                returnedUser.should.have.property('_id');
                returnedUser.should.have.property('FirstName');
                returnedUser.should.have.property('LastName');
                returnedUser.should.have.property('__t');
                returnedUser.__t.should.eql('Student');
                returnedUser.should.be.an.instanceof(Student);
                
                done();
            });
        });
    });
//Finished POST /petshop/pets

//Testing GET /users - positive test
describe('GET /users', () => {
    it('it should GET user', (done) => {
        chai.request(server)
        .get(`/users/${userId}`)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('string');
            res.body.length.should.not.be.eql(0);
            done();
        });
    });
});
//Testing GET /users - positive test

//Testing PUT /users - positive test
describe('PUT /users', () => {
    let user;
    let updateUserName = "Thomas";

    before(function(done) {
        User.find({})
        .then(data => {
            user = {
                FirstName: updateUserName,
            }; 
            done();
        })
        .catch(err => {
            done(err);
        });
    });
    
    it('it should PUT an user ', (done) => {        
        chai.request(server)
            .put(`/users/${userId}`)
            .send(user)
            .end((err, res) => {
                const returnedUser = (User)(JSON.parse(res.body));

                console.log(returnedUser);

                res.should.have.status(200);
                returnedUser.FirstName.should.not.eql(userName);
                returnedUser.FirstName.should.eql(updateUserName);
                
                done();
            });
        });
    });
//Testing PUT /users - positive test

//Testing DELETE /users - positive test
describe('DELETE /users', () => {
    it('it should DELETE user', (done) => {
        chai.request(server)
        .delete(`/users/${userId}`)
        .end((err, res) => {
            res.should.have.status(200);
            done();
        });
    });
});
//Testing DELETE /users - positive test