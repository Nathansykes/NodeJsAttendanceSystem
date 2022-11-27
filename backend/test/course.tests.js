let chai = require('chai');
let chaiHttp = require('chai-http');
const e = require('express');
let server = require('../app');
let should = chai.should();
let Course = require('../models/course.model');

chai.use(chaiHttp);

//Testing GET /courses
describe('GET /courses', () => {
    it('it should GET all the courses', (done) => {
        chai.request(server)
        .get('/courses')
        .auth(token, {type: 'bearer'})
        .end((err, res) => {
            res.should.have.status(200);
            res.body.length.should.not.be.eql(0);
            done();
        });
    });
});
//Finished GET /courses

var courseId = "cour16492841";
var courseTitle = "Software Engineering"
//Testing POST /courses - positive test
describe('POST /courses', () => {
    let course;

    before(function(done) {
        Course.find({})
        .then(data => {
            course = {
                Id: courseId,
                Title: courseTitle,
            };
            done();
        })
        .catch(err => {
            done(err);
        });
    });
    
    it('it should POST an course ', (done) => {        
        chai.request(server)
            .post('/courses')
            .auth(token, {type: 'bearer'})
            .send(course)
            .end((err, res) => {
                const returnedCourse = (Course)(JSON.parse(res.body));

                res.should.have.status(200);
                returnedCourse.should.have.property('_id');
                returnedCourse.should.have.property('Title');
                returnedCourse.should.have.property('CourseLeader');
                returnedCourse.should.have.property('Modules');
                
                done();
            });
        });
    });
//Finished POST

//Testing GET /courses - positive test
describe('GET /courses', () => {
    it('it should GET course', (done) => {
        chai.request(server)
        .get(`/courses/${courseId}`)
        .auth(token, {type: 'bearer'})
        .end((err, res) => {
            res.should.have.status(200);
            res.body.length.should.not.be.eql(0);

            const returnedCourse = JSON.parse(res.body)[0];
            returnedCourse.should.have.property('Id');
            returnedCourse.should.have.property('Title');
            returnedCourse.should.have.property('CourseLeader');
            returnedCourse.should.have.property('Modules');
            done();
        });
    });
});
//Testing GET /courses - positive test

//Testing PUT /courses - positive test
describe('PUT /courses', () => {
    let course;
    let updateCourseTitle = "Computer Science";

    before(function(done) {
        Course.find({})
        .then(data => {
            course = {
                Title: updateCourseTitle,
            }; 
            done();
        })
        .catch(err => {
            done(err);
        });
    });
    
    it('it should PUT an course ', (done) => {        
        chai.request(server)
            .put(`/courses/${courseId}`)
            .auth(token, {type: 'bearer'})
            .send(course)
            .end((err, res) => {
                const returnedCourse = (Course)(JSON.parse(res.body));

                res.should.have.status(200);
                returnedCourse.Title.should.not.eql(courseTitle);
                returnedCourse.Title.should.eql(updateCourseTitle);
                
                done();
            });
        });
    });
//Testing PUT /courses - positive test

//Testing DELETE /courses - positive test
describe('DELETE /courses', () => {
    it('it should DELETE course', (done) => {
        chai.request(server)
        .delete(`/courses/${courseId}`)
        .auth(token, {type: 'bearer'})
        .end((err, res) => {
            res.should.have.status(200);
            done();
        });
    });
});
//Testing DELETE /courses - positive test