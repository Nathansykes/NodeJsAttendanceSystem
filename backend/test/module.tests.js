let chai = require('chai');
let chaiHttp = require('chai-http');
const e = require('express');
let server = require('../app');
let should = chai.should();
let Module = require('../models/module.model');

chai.use(chaiHttp);

//Testing GET /modules
describe('GET /modules', () => {
    it('it should GET all the modules', (done) => {
        chai.request(server)
        .get('/modules')        
        .auth(token, {type: 'bearer'})
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('string');
            res.body.length.should.not.be.eql(0);
            done();
        });
    });
});
//Finished GET /modules

var moduleId = "module123456";
var moduleTitle = "Web Application Development"
//Testing POST /modules - positive test
describe('POST /modules', () => {
    let module;

    before(function(done) {
        Module.find({})
        .then(data => {
            module = {
                Id: moduleId,
                Title: moduleTitle,
            };
            done();
        })
        .catch(err => {
            done(err);
        });
    });
    
    it('it should POST an module ', (done) => {        
        chai.request(server)
            .post('/modules')
            .auth(token, {type: 'bearer'})
            .send(module)
            .end((err, res) => {
                const returnedModule = (Module)(JSON.parse(res.body));

                res.should.have.status(200);
                returnedModule.should.have.property('_id');
                returnedModule.should.have.property('Title');
                returnedModule.should.have.property('ModuleLeader');
                returnedModule.should.have.property('Sessions');
                returnedModule.should.have.property('Tutors');
                
                done();
            });
        });
    });
//Finished POST

//Testing GET /modules - positive test
describe('GET /modules', () => {
    it('it should GET module', (done) => {
        chai.request(server)
        .get(`/modules/${moduleId}`)
        .auth(token, {type: 'bearer'})
        .end((err, res) => {
            res.should.have.status(200);
            res.body.length.should.not.be.eql(0);

            const returnedModule = JSON.parse(res.body)[0];
            returnedModule.should.have.property('Id');
            returnedModule.should.have.property('Title');
            returnedModule.should.have.property('ModuleLeader');
            returnedModule.should.have.property('Sessions');
            done();
        });
    });
});
//Testing GET /modules - positive test

//Testing PUT /modules - positive test
describe('PUT /modules', () => {
    let module;
    let updateModuleTitle = "Software Application Development";

    before(function(done) {
        Module.find({})
        .then(data => {
            module = {
                Title: updateModuleTitle,
            }; 
            done();
        })
        .catch(err => {
            done(err);
        });
    });
    
    it('it should PUT an module ', (done) => {        
        chai.request(server)
            .put(`/modules/${moduleId}`)
            .auth(token, {type: 'bearer'})
            .send(module)
            .end((err, res) => {
                const returnedModule = (Module)(JSON.parse(res.body));

                res.should.have.status(200);
                returnedModule.Title.should.not.eql(moduleTitle);
                returnedModule.Title.should.eql(updateModuleTitle);
                
                done();
            });
        });
    });
//Testing PUT /modules - positive test

//Testing DELETE /modules - positive test
describe('DELETE /modules', () => {
    it('it should DELETE module', (done) => {
        chai.request(server)
        .delete(`/modules/${moduleId}`)
        .auth(token, {type: 'bearer'})
        .end((err, res) => {
            res.should.have.status(200);
            done();
        });
    });
});
//Testing DELETE /modules - positive test