const { Router } = require('express');

// // Importar todos los routers;
// // Ejemplo: const authRouter = require('./auth.js');

 const { Videogame, Genero } = require('../db');
 //const addgame = require('../routes/addgame')

 const router = Router();



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//router.use('/addgame', addgame);

//router.use(express.json());

router.get('/', async function(req, res){
//console.log(Genero)
   try{
    const pages = await Genero.findAll();
    //res.status(200).send("hola");
    res.json(pages) 
   }
   catch(error){
       res.send(error)
   }
   
})

router.post('/addgame', async function(req, res){
    console.log("soy el body: ",req.body);
   //res.send(req.body.name);
    const { nombre } = req.body;
    // res.status(200).json(req.body);
    try{
        const nuevoGenero = await Genero.create({nombre});
        console.log("El nuevo registro es:", nuevoGenero.id);
        res.json(nuevoGenero)

    }
    catch(error){
        res.send(error)
    }
  
})



module.exports = router;
