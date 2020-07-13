const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../dbconnection');

// GET all 
router.get('/ultimoRegistro', (req, res) => {
  mysqlConnection.query('SELECT * FROM datos ORDER BY id DESC LIMIT 1', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

router.post('/enviardatos', (req, res) => {
    const sql = 'INSERT INTO datos SET ?';
    const datosObj = {
        tasaInteraccion:        req.body.tasaInteraccion,
        probabilidadContagio:   req.body.probabilidadContagio,
        TasaRecuperacion:       req.body.TasaRecuperacion,
        TasaMortalidad:         req.body.TasaMortalidad,
        fechaRegistro:          req.body.fechaRegistro,
        dias:                   req.body.dias,
        infectadosinicial:      req.body.infectadosinicial,
        poblacionInicialSusc:   req.body.poblacionInicialSusc,
        fallecidosini:          req.body.fallecidosini,
        recuperadosini:         req.body.recuperadosini,
        municipio:              req.body.municipio
    }
    mysqlConnection.query(sql,datosObj, err => {
      if(!err) {
        res.json({status: 'datos añadidos'});
      } else {
        console.log(err);
      }
    });
  
  });
module.exports = router;
