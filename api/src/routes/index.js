const { Router } = require('express');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op
const axios = require('axios')
require('dotenv').config();
const { API_KEY} = process.env;

// // Importar todos los routers;
// // Ejemplo: const authRouter = require('./auth.js');

 const { Videogame, Genero } = require('../db');
 //const addgame = require('../routes/addgame')

 const router = Router();



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//router.use('/addgame', addgame);

//router.use(express.json());
router.get('/videogames', async function(req, res){
//console.log(Op)    

    try {
        if(req.query.name){
            let name = req.query.name;
            const gamesDb = await Videogame.findAll({
                where:{                   
                    name: {
                        [Op.like]: `%${name}%`, 
                    }
                },
                attributes: ['id','name','background_image','platforms','rating','released'], 
                limit: 15,
                include    : [{ model: Genero, 
                    through: {attributes: []},
                    attributes:{include:  ['nombre'], exclude: ['id', 'createdAt','updatedAt']}}]
                
            }); 

            let limitApi = 15 - gamesDb.length;

            const games = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}&page_size=${limitApi}`)
            let allGames = [...games.data.results]
        //console.log(games.data.results)
        const resultado = [];
        if(gamesDb.length > 0){
           
            gamesDb.forEach(g =>{
                //resultado.push(g)
                let gameSinOrigen = g;
                resultado.push({
                  id: g.id,
                  name: g.name,
                  background_image: g.background_image,
                  platforms: g.platforms,
                  rating: g.rating,
                  released: g.released,
                  generos: g.generos,
                  origen: 'db'
                })
            })

                 }
         
          allGames.forEach(g =>{
            let generos = [];
            g.genres.forEach(g => {
                generos.push({
                  nombre: g.name
                });
                })    

                
            resultado.push({
              id: g.id,
              name: g.name,
              background_image: g.background_image,
              platforms: g.platforms,
              rating: g.rating,
              released: g.released,
              generos: generos,
              origen: 'api'
            })
          })

         
        if(resultado.length>0) {
          console.log(resultado)
            return res.json(resultado)
        }
            else{
                resultado.push(
                    {
                        mensaje: "...I'm sorry but there isn't a game the word/s '"+req.query.name+"' in your name."
            })
               return res.json(resultado)
            }
        }else{

        const games = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=1&page_size=40`)
        const games2 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5&page_size=40`)
        const games3 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=7&page_size=20`)
        let allGames = [...games.data.results, ...games2.data.results, ...games3.data.results]
        //console.log(games.data.results)
        const resultado = [];

        const gamesDb = await Videogame.findAll({
            attributes: ['id','name','background_image','platforms','rating','released'], 
            limit: 15,
            include    : [{ model: Genero, 
                through: {attributes: []},
                attributes:{include:  ['nombre'], exclude: ['id', 'createdAt','updatedAt']}}]
        }); 

        
        if(gamesDb.length > 0){
           
            gamesDb.forEach(g =>{
                //resultado.push(g)
                let gameSinOrigen = g;
                resultado.push({
                  id: g.id,
                  name: g.name,
                  background_image: g.background_image,
                  platforms: g.platforms,
                  rating: g.rating,
                  released: g.released,
                  generos: g.generos,
                  origen: 'db'
                })
            })

                 }
         
          allGames.forEach(g =>{
            let generos = [];
            g.genres.forEach(g => {
                generos.push({
                  nombre: g.name
                });
                })    

                
            resultado.push({
              id: g.id,
              name: g.name,
              background_image: g.background_image,
              platforms: g.platforms,
              rating: g.rating,
              released: g.released,
              generos: generos,
              origen: 'api'
            })
          })

         

        res.json(resultado) 

        }
              
       
    }
    catch (err) {
        res.send(err)
    }
   
    
})


router.get('/videogame/:idVideogame', async function(req, res){
try{
    console.log('Hola params: ', req.params)
    const { idVideogame } = req.params;

    let resultado = []; 

    if(!idVideogame.toString().includes('-')){
        const gameApi = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`)
    //(gameApi.hasOwnProperty('detail')) ? gameApi = '' : gameApi  = 
   
 
    //console.log('tenemos')
   
        let  gameApiArray = [gameApi.data];
        
       gameApiArray.forEach(g =>{
            let generos = [];
            g.genres.forEach(g => {
                generos.push({
                  nombre: g.name
                });
                })        
                
            resultado.push({
              id: g.id,
              name: g.name,
              background_image: g.background_image,
              description: g.description_raw,
              platforms: g.platforms,
              rating: g.rating,
              released: g.released,
              generos: generos,
              website: g.website,
              origen: 'api'
            })
          })
 

    }else{
        // console.log('Hola params: ', req.params)
       // resultado.push({name: 'prueba'})
    const gameDb = await Videogame.findByPk(idVideogame, {
        attributes: ['name','description','background_image', 'released','rating','platforms'],
        include    : [{ model: Genero, 
            through: {attributes: []},
            attributes:{include:  ['nombre'], exclude: ['id', 'createdAt','updatedAt']}}]
    });

    //console.log(gameDb.dataValues.generos[0].dataValues.nombre)
 let generos = []; 
        gameDb.dataValues.generos.forEach(g =>{
                     
                generos.push({
                  nombre: g.dataValues.nombre
                });
                
            })      
                
            resultado.push({
              id: gameDb.dataValues.id,
              name: gameDb.dataValues.name,
              background_image: gameDb.dataValues.background_image,
              description: gameDb.dataValues.description,
              platforms: gameDb.dataValues.platforms,
              rating: gameDb.dataValues.rating,
              released: gameDb.dataValues.released,
              generos: generos,
              website: '',
              origen: 'db'
            })
         

    }
    //console.log(resultado)
    res.json(resultado) 

}
catch(e){
    res.send(e)
}
        

  
})

router.get('/genres', async function(req,res){
    try{      
        console.log(API_KEY)
      const genres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
      //console.log(genres.data.results)
      let arrayGeneros = [];
      genres.data.results.map(g => {
        arrayGeneros.push({nombre: g.name})
      })
      const generos = await Genero.bulkCreate(arrayGeneros);

      let generosFiltrados = [];
      generos.map(g => {
        generosFiltrados.push({id: g.id, nombre: g.nombre})
      })

      res.json(generosFiltrados)
       }
       catch(err){
           res.send(err)
       }
})

router.post('/videogame', async function(req, res){
   
    //name, released, rating, platform
   //res.send(req.body.name);
    
    //console.log("soy el body: ", nombre, lanzamiento, rating, plataformas, generos, image_url)
    // res.status(200).json(req.body);
    try{
      console.log("soy el body: ",req.body);
      var { nombre, description, released, rating, platforms, generos, image_url } = req.body;
    //(typeof plataformas === 'object') ? plataformas = plataformas.join('; ') : plataformas=plataformas

    let generosToAdd = [];
    generos.forEach(g => {
      generosToAdd.push(g.genero)
    })

    console.log('generosAdd: ',generosToAdd)

    let plataformasToAdd='';
    platforms.forEach(p =>{
      plataformasToAdd += p.platform
    })
        const nuevoVideo = await Videogame.create({name: nombre, description:description, released: released,rating:rating, platforms: plataformasToAdd, background_image: image_url});
        //const nuevoGenero = await Genero.create({nombre: 'Adventure'})
       

        const nuevoVideoGeneros = await nuevoVideo.addGenero(generosToAdd)

        console.log("El nuevo registro es:", nuevoVideo.dataValues);
        //res.send({result:'Game Added Satisfatory'})
        //console.log({result:'Game Added Satisfatory'})

        res.status(200).json(nuevoVideo.dataValues.name)

        //res.redirect('http://localhost:3000/videogames/home')

    }
    catch(error){
        res.send(error)
    }
  
})


router.get('/platforms', async function(req, res){
   try{
    const platforms = await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`)
    //console.log(platforms)
    let arrayPlataformas = [];

    platforms.data.results.map(p => {
        arrayPlataformas.push({nombre: p.name})
      })

    res.json(arrayPlataformas)

   }
   catch(e){
       res.send(e)
   }
})



module.exports = router;
