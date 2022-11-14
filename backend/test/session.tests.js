let chai = require('chai');
let chaiHttp = require('chai-http');
const e = require('express');
let server = require('../app');
let should = chai.should();
let Session = require('../models/session.model');

chai.use(chaiHttp);

let sessionId = "12345678";
let students = [321321321321, 123123123123]
let location = 'charlesStreet';
let dateTime = new Date(11-10-2022);
//Testing POST /sessions - positive test
describe('POST /sessions', () => {
    let session;

    before(function(done) {
        Session.find({})
        .then(data => {
            session = {
                _Id: sessionId,
                Students: students,
                Location: location,
                DateAndTime: dateTime,
            }; 
            done();
        })
        .catch(err => {
            done(err);
        });
    });
    
    it('it should POST an session ', (done) => {        
        chai.request(server)
            .post('/sessions')
            .send(session)
            .end((err, res) => {
                const returnedSession = (Session)(JSON.parse(res.body));

                res.should.have.status(200);
                returnedSession.should.have.property('Students');
                returnedSession.should.have.property('Location');
                returnedSession.should.have.property('DateAndTime');
                returnedSession.should.be.an.instanceof(Session);
                
                done();
            });
        });
});

//Testing GET /users
describe('GET /sessions', () => {
    it('it should GET all the sessions', (done) => {
        chai.request(server)
        .get('/sessions')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('string');
            res.body.length.should.not.be.eql(0);
            done();
        });
    });
});
//Finished GET /users

//Testing PUT /users - positive test
describe('PUT /users', () => {
    let session;
    let updateLocation = "Owen";

    before(function(done) {
        Session.find({})
        .then(data => {
            session = {
                Location: updateLocation,
            }; 
            done();
        })
        .catch(err => {
            done(err);
        });
    });
    
    it('it should PUT an session ', (done) => {        
        chai.request(server)
            .put(`/sessions/${sessionId}`)
            .send(session)
            .end((err, res) => {
                const returnedSession = (Session)(JSON.parse(res.body));

                console.log(returnedSession);

                res.should.have.status(200);
                returnedUser.FirstName.should.not.eql(location);
                returnedUser.FirstName.should.eql(updateLocation);
                
                done();
            });
        });
    });
//Testing PUT /sessions - positive test

//Testing DELETE /users - positive test
describe('DELETE /sessions', () => {
    it('it should DELETE session', (done) => {
        chai.request(server)
        .delete(`/users/${sessionId}`)
        .end((err, res) => {
            res.should.have.status(200);
            done();
        });
    });
});
//Testing DELETE /sessions - positive test