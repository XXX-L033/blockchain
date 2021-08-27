const server = require('../DBServer/server');
const chai = require("chai");
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.should();
chai.use(chaiHttp);
const acc = "0x51d0Ae990fa1aef157D0dAD66409445928d3404B";

const bond = [
    {"message": {
            "faceValue": [
                "1",
                "10"
            ],
            "type": "2",
            "name": "CN",
            "income": 10000,
            "BName": "Loan",
            "BSymbol": "LTC",
            "coupon": 3,
            "account": "0x51d0Ae990fa1aef157D0dAD66409445928d3404B",
            "startDate": new Date("2021-08-20T00:18:48.594Z"),
            "maturityDate": new Date("2021-09-05T00:18:53.390Z"),
            "regulator": true,
            "verifier": true,
            "url": "www.google.com",
            "description": "help global warm",
            "__v": 0,
            "regulatorFeedback": null,
            "state": true,
            "totalGet": null,
            "totalPerson": null,
            "verifierFeedback": null
        }
    }];


//GET
describe('Database testing', () => {
        it(`should return bonds issued by ${acc}`, function (done) {
            chai.request(server.app)
                .get(`/bond/${acc}`)
                .end((err, response) =>{
                    response.should.have.status(200)
                    response.body[0].should.have.property("account").eq(acc)
                    done();
                })
        });

        it(`should return total ETH of the issuer ${acc}`, function (done){
            chai.request(server.app)
                .get(`/total/${acc}`)
                .end((err, response) =>{
                    response.should.have.status(200)
                    response.body[0].should.have.property('_id').eq(acc)
                    response.body[0].should.be.a('object')
                    response.body[0].should.have.property('totalGet')
                    done();
                })
        })

    it(`should return all bonds that are issuable`, function (done){
        chai.request(server.app)
            .get('/purchase/')
            .end((err, response) =>{
                response.should.have.status(200)
                response.body[0].should.have.property('state').to.be.ok
                response.body[0].should.be.a('object')
                done();
            })
    })
})






