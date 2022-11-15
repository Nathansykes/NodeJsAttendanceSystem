let chai = require('chai');
let chaiHttp = require('chai-http');
const e = require('express');
let server = require('../app');
let should = chai.should();
let Session = require('../models/session.model');

chai.use(chaiHttp);

var sessionId = "session12345";
let students = [321321321321, 123123123123]
let location = 'Charles Street';
let dateTime = "11-10-2022";

//Testing GET /sessions
describe('GET /sessions', () => {
    it('it should GET all the sessions', (done) => {
        chai.request(server)
        .get('/sessions')        
        .auth(token, {type: 'bearer'})
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('string');
            res.body.length.should.not.be.eql(0);
            done();
        });
    });
});
//Finished GET /sessions

//Testing POST /sessions - positive test
describe('POST /sessions', () => {
    let session;

    before(function(done) {
        Session.find({})
        .then(data => {
            session = {
                Id: sessionId,
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
            .auth(token, {type: 'bearer'})
            .send(session)
            .end((err, res) => {
                console.log(session);
                console.log(res.body);
                const returnedSession = (Session)(JSON.parse(res.body));

                res.should.have.status(200);
                returnedSession.should.have.property('_id');
                returnedSession.should.have.property('Students');
                returnedSession.should.have.property('Location');
                returnedSession.should.have.property('DateAndTime');
                returnedSession.should.be.an.instanceof(Session);
                
                done();
            });
        });
    });
//Finished POST

//Testing GET /sessions - positive test
describe('GET /sessions', () => {
    it('it should GET session', (done) => {
        chai.request(server)
        .get(`/sessions/${sessionId}`)
        .auth(token, {type: 'bearer'})
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('string');
            res.body.length.should.not.be.eql(0);

            const returnedSession = (Session)(JSON.parse(res.body));

            returnedSession.Location.should.eql(location);
            returnedSession.DateAndTime.should.eql(new Date(dateTime));
            done();
        });
    });
});
//Testing GET /sessions - positive test

let updateLocation = "Owen";
let updateDateTime = "12-21-2022";
//Testing PUT /sessions - positive test
describe('PUT /sessions', () => {
    let session;

    before(function(done) {
        Session.find({})
        .then(data => {
            session = {
                Students: students,
                DateAndTime: updateDateTime,
                Location: updateLocation,
            };
            done();
        })
        .catch(err => {
            done(err);
        });
    });
    
    it('it should POST an session ', (done) => {        
        chai.request(server)
            .put(`/sessions/${sessionId}`)
            .auth(token, {type: 'bearer'})
            .send(session)
            .end((err, res) => {
                const returnedSession = (Session)(JSON.parse(res.body));

                res.should.have.status(200);

                console.log(res.body);
                console.log(returnedSession);

                returnedSession.Location.should.not.eql(location);
                returnedSession.Location.should.eql(updateLocation); 
                returnedSession.DateAndTime.should.not.eql(new Date(dateTime));
                returnedSession.DateAndTime.should.eql(new Date(updateDateTime));
                
                done();
            });
        });
    });
//Testing PUT /sessions - positive test

//Testing DELETE /sessions - positive test
describe('DELETE /sessions', () => {
    it('it should DELETE session', (done) => {
        chai.request(server)
        .delete(`/sessions/${sessionId}`)
        .auth(token, {type: 'bearer'})
        .end((err, res) => {
            res.should.have.status(200);
            done();
        });
    });
});
//Testing DELETE /sessions - positive test