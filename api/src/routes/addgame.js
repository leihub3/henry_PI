var express = require('express');
var router = express.Router();
const { Genero } = require('../db')

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
