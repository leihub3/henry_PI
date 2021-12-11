var express = require('express');
var router = express.Router();
const { Videogame } = require('../db')

router.get('/', async function(req, res){
    try{
        const games = await Videogame.findAll();

        res.json(games)

    }
    catch(error){
        res.send(error)
    }
  
})

module.exports = router;