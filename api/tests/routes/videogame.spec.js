
const { Videogame, conn } = require('../../src/db.js');
const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../../src/app.js');

chai.use(chaiHttp)

beforeEach(() => Videogame.sync({ force: true }));

describe('Testing /', () => {
  it('should GET a Welcome message', (done) => {
    chai.request(server)
    .get('/')
    .end((err,res) => {
      //console.log(res.body)
      res.should.have.status(200)
      res.body.should.be.a('object')
      expect(res.body).to.have.property('message')
      expect(res.body.message).to.be.eql('Welcome to the All Times Video Games Collection')
      done();
    })
   
  })

})

describe('Testing /videogames', () => {
  it('should GET 100 videogames from the API', async () => {
    const res = await chai.request(server)
    .get('/videogames')
    //console.log({bodyLenght: res.body.length})
    res.should.have.status(200)
    res.body.should.be.a('array')
    expect(res.body.length).to.be.eql(100)
    //done();
    // })
  }).timeout(15000)
})

describe('Testing /videogame/:id', () => {
  it('should GET a game if we pass through a valid id', async () => {
    /* Obtenemos un Id valido de la api */
    const res = await chai.request(server)
    .get('/videogames')
    let validIdGame = res.body[0].id;
    const res2 = await chai.request(server)
    .get('/videogame/'+validIdGame)
    res2.should.have.status(200)
    res2.body.should.be.a('array')
    expect(res2.body[0].id).to.be.eql(validIdGame)
    //console.log(res2.body[0].id)

  }).timeout(15000)
  it('should NOT GET a game if we pass through an INVALID id', async () => {
    const res = await chai.request(server)
    .get('/videogame/x1234b')
    res.should.have.status(200)
    expect(res.body.status).to.be.eql(404)
    //console.log(res.body.status)
    //console.log(res2.body[0].id)

  })
});