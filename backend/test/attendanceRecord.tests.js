let chai = require('chai');
let chaiHttp = require('chai-http');
const e = require('express');
let server = require('../app');
let should = chai.should();
const AttendanceRecord = require('../models/attendanceRecord.model');

chai.use(chaiHttp);

var attendanceRecordId = "attendanceRe";
let student = 321321321321;
let attendance = 0;

//Testing GET /attendanceRecords
describe('GET /attendanceRecords', () => {
    it('it should GET all the attendanceRecords', (done) => {
        chai.request(server)
        .get('/attendanceRecords')        
        .auth(token, {type: 'bearer'})
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('string');
            res.body.length.should.not.be.eql(0);
            done();
        });
    });
});
//Finished GET /attendanceRecords

//Testing POST /attendanceRecords - positive test
describe('POST /attendanceRecords', () => {
    let attendanceRecord;

    before(function(done) {
        AttendanceRecord.find({})
        .then(data => {
            attendanceRecord = {
                Id: attendanceRecordId,
                Student: student,
                Attendance: attendance
            };
            done();
        })
        .catch(err => {
            done(err);
        });
    });
    
    it('it should POST an attendanceRecord ', (done) => {        
        chai.request(server)
            .post('/attendanceRecords')
            .auth(token, {type: 'bearer'})
            .send([attendanceRecord])
            .end((err, res) => {
                const returnedattendanceRecord = (AttendanceRecord)(JSON.parse(res.body));

                res.should.have.status(200);
                returnedattendanceRecord.should.have.property('_id');
                returnedattendanceRecord.should.have.property('Student');
                returnedattendanceRecord.should.have.property('Attendance');
                returnedattendanceRecord.should.be.an.instanceof(AttendanceRecord);
                
                done();
            });
        });
    });
//Finished POST

//Testing GET /attendanceRecords - positive test
describe('GET /attendanceRecords', () => {
    it('it should GET attendanceRecord', (done) => {
        chai.request(server)
        .get(`/attendanceRecords/${attendanceRecordId}`)
        .auth(token, {type: 'bearer'})
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('string');
            res.body.length.should.not.be.eql(0);

            done();
        });
    });
});
//Testing GET /attendanceRecords - positive test

let updateAttendance = 1;
//Testing PUT /attendanceRecords - positive test
describe('PUT /attendanceRecords', () => {
    let attendanceRecord;

    before(function(done) {
        AttendanceRecord.find({})
        .then(data => {
            attendanceRecord = {
                Student: student,
                Attendance: updateAttendance,
            };
            done();
        })
        .catch(err => {
            done(err);
        });
    });
    
    it('it should PUT an attendanceRecord ', (done) => {        
        chai.request(server)
            .put(`/attendanceRecords/${attendanceRecordId}`)
            .auth(token, {type: 'bearer'})
            .send(attendanceRecord)
            .end((err, res) => {
                const returnedattendanceRecord = (AttendanceRecord)(JSON.parse(res.body));

                res.should.have.status(200);

                returnedattendanceRecord.Attendance.should.not.eql(attendance);
                returnedattendanceRecord.Attendance.should.eql(updateAttendance); 
                
                done();
            });
        });
    });
//Testing PUT /attendanceRecords - positive test

//Testing DELETE /attendanceRecords - positive test
describe('DELETE /attendanceRecords', () => {
    it('it should DELETE attendanceRecord', (done) => {
        chai.request(server)
        .delete(`/attendanceRecords/${attendanceRecordId}`)
        .auth(token, {type: 'bearer'})
        .end((err, res) => {
            res.should.have.status(200);
            done();
        });
    });
});
//Testing DELETE /attendanceRecords - positive test