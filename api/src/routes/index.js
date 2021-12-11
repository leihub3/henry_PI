const { Router } = require('express');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op
//import { getGenresAPI } from '../../../client/src/redux/actions';

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
//console.log(req.query.name)
   try{
       if(req.query.name){
        const pages = await Videogame.findAll({
            attributes: ['name','background_image'], 
            limit: 15,
            include    : [{ model: Genero, 
                through: {attributes: []},
                attributes:{include:  ['nombre'], exclude: ['id', 'createdAt','updatedAt']}}],
            where: {
                name: {
                    [Op.like]: `%${req.query.name}%`
                }
            },
            limit: 15
         }); 

         if(pages.length > 0){
            res.json(pages)
         }else{
             res.send('No se encontró ningún registro con ese criterio de búsqueda.')
         }

         
       }else{
        const pages = await Videogame.findAll({
            attributes: ['name','background_image'], 
            limit: 15,
            include    : [{ model: Genero, 
                through: {attributes: []},
                attributes:{include:  ['nombre'], exclude: ['id', 'createdAt','updatedAt']}}]
        }); 

        //const videoNames = JSON.stringify(pages);

        if(pages.length > 0){
            res.json(pages)
         }else{
             res.send('No existe ningún registro aún en nuestra base de datos.')
         } 
       }
    
    
    //res.status(200).send("hola");
    
   }
   catch(error){
       res.send(error)
   }
   
})


router.get('/videogame/:idVideogame', async function(req, res){
    console.log('Hola params: ', req.params)
    const { idVideogame } = req.params;
    console.log('Hola params: ', req.params)
    const game = await Videogame.findByPk(idVideogame, {
        attributes: ['name','background_image', 'released','rating','platforms'],
        include    : [{ model: Genero, 
            through: {attributes: []},
            attributes:{include:  ['nombre'], exclude: ['id', 'createdAt','updatedAt']}}]
    });

    res.json(game)

})

router.get('/genres', async function(req,res){

    try{      
        const generosBack = await Genero.findAll({
            attributes: ['id','nombre']
        });
        //console.log(generosBack)    
        res.json(generosBack);
    
       }
       catch(err){
           res.send(err)
       }
})

router.post('/genres', async function(req,res){
    try{
        const { arrayGeneros } = req.body;   
    //console.log(arrayGeneros[0].nombre)
    const checkIfExist = await Genero.findAll({
        where:{
            nombre: arrayGeneros[0].nombre
        }
    })
    //console.log('Checkif: ',checkIfExist)

        if(checkIfExist.length > 0){
            res.send('Los generos que se intentan guardar ya existen en nuestr DB.')
        }else{
            const generos = await Genero.bulkCreate(arrayGeneros);
            res.json(generos)
        }

    }
    catch(err){
        console.log(err)
    }
    
    
})


router.post('/videogame', async function(req, res){
    //console.log("soy el body: ",req.body);
    //name, released, rating, platform
   //res.send(req.body.name);
    const { nombre, lanzamiento, rating, plataformas, generos, image_url } = req.body;
    console.log("soy el body: ", nombre, lanzamiento, rating, plataformas, generos, image_url)
    // res.status(200).json(req.body);
    try{
        const nuevoVideo = await Videogame.create({name: nombre, released: lanzamiento,rating:rating, platforms: plataformas.join("_"), background_image: image_url});
        //const nuevoGenero = await Genero.create({nombre: 'Adventure'})

        const nuevoVideoGeneros = await nuevoVideo.addGenero(generos)

        console.log("El nuevo registro es:", nuevoVideo.id);

        res.redirect('http://localhost:3000/home')

    }
    catch(error){
        res.send(error)
    }
  
})



module.exports = router;
