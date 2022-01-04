/* eslint-disable import/no-extraneous-dependencies */
// const { expect } = require('chai');
// const session = require('supertest-session');
// const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');
const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../../src/app.js');

chai.use(chaiHttp)

beforeEach(() => Videogame.sync({ force: true }));

describe('Testing my Landing Page', () => {
  it('The / route should GET a Welcome message', (done) => {
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

describe('Testing the Home Page', () => {
  it('/videogames should GET 100 videogames from the API', async () => {
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

describe('Testing if could GET a videogame by id', () => {
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
    //let invalidIdGame = x1234b;
    const res = await chai.request(server)
    .get('/videogame/x1234b')
    res.should.have.status(200)
    expect(res.body.status).to.be.eql(404)
    //console.log(res.body.status)
    //console.log(res2.body[0].id)

  }).timeout(15000)
});

// const agent = session(app);
// const videogame = {
//   name: 'Super Mario Bros',
//   description: 'description',
//   background_image: 'hjjkl',
//   platforms: 'Atari'
// };

// describe('Videogame routes', () => {
//   before(() => conn.authenticate()
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   }));
//   beforeEach(() => Videogame.sync({ force: true })
//     .then(() => Videogame.create(videogame)));

//   describe('GET /videogames', () => {
//     it('should get 200',  () => {
//       //agent.get('/videogames').expect(200)
//       agent.get('/videogames')
//       .expect(201)
//       .then(response => console.log(response.body.length))
//       //console.log(agent.get('/videogames'))
//     });
    
//   });
// });
