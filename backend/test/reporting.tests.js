let chai = require('chai');
let chaiHttp = require('chai-http');
const e = require('express');
const { test } = require('mocha');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);


function testReport(res) {
    res.should.have.status(200);
    res.body.should.be.a('string');
    var data = JSON.parse(res.body);
    data.Records.should.be.a('array');
    parseInt(data.Records.length).should.be.above(0);
}

describe('GET student report ALL', () => {
    it('it should get report for all attendance for student', (done) => {
        chai.request(server)
        .get('/reporting/student')
        .query({StudentId: "1000"})
        .auth(token, {type: 'bearer'})
        .end((err, res) => {
            testReport(res);
            done();
        });
    });
});

describe('GET student report MODULE', () => {
    it('it should get report for all attendance in module for student', (done) => {
        chai.request(server)
        .get('/reporting/student')
        .query({StudentId: "1000", ModuleId: "6d6f64756c65313233343538"})
        .auth(token, {type: 'bearer'})
        .end((err, res) => {
            testReport(res);
            done();
        });
    });
});

describe('GET student report COURSE', () => {
    it('it should get report for all attendance in course for student', (done) => {
        chai.request(server)
        .get('/reporting/student')
        .query({StudentId: "1000", CourseId: "63737b30333e9cb735d40ea4"})
        .auth(token, {type: 'bearer'})
        .end((err, res) => {
            testReport(res);
            done();
        });
    });
});

describe('Get module attendance report', () => {
    it('it should get report for all attendance in module', (done) => {
        chai.request(server)
        .get('/reporting/module')
        .query({ModuleId: "6d6f64756c65313233343538"})
        .auth(token, {type: 'bearer'})
        .end((err, res) => {
            testReport(res);
            done();
        });
    });
});     

describe('Get course attendance report', () => {
    it('it should get report for all attendance in course', (done) => {
        chai.request(server)
        .get('/reporting/course')
        .query({CourseId: "63737b30333e9cb735d40ea4"})
        .auth(token, {type: 'bearer'})
        .end((err, res) => {
            testReport(res);
            done();
        });
    });
});