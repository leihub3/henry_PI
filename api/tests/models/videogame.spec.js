const { Videogame, conn } = require('../../src/db.js');
const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../../src/app.js');

chai.use(chaiHttp)

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe('name', () => {
      const videogame = {
       name: 'Super Mario Bross',
        description: 'description',
        platforms: 'Atari',
    };
      it('should throw an error if some of the required values are null', (done) => {
        Videogame.create(videogame)
        .then((res) => {
          done(new Error('It requires a valid name'));
        })
        .catch((err) => {
          done();
          //console.log(err)        
        });
      })
      it('should record a new game in the DB receiving all the required values', async () => {
        const videogame2 = {
          name: 'Super Mario Bross OK',
           description: 'description',
           background_image: 'img.jpg',
           platforms: 'Atari'
       };
       const newGame = await Videogame.create(videogame2)       
       expect(newGame.dataValues.name).to.be.eql('Super Mario Bross OK')
       expect(newGame.dataValues.description).to.be.eql('description')
       expect(newGame.dataValues.background_image).to.be.eql('img.jpg')
       expect(newGame.dataValues.platforms).to.be.eql('Atari')
       //console.log(newGame.dataValues.name)
      })
      // .timeout(15000)
      
    });
    
  });
});
