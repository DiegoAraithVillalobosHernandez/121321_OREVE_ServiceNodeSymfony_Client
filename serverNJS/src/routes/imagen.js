const express = require('express');
const router = express.Router();
const pool = require('../database.js');

router.get('/:id', async (req, res) => { // GetById
    let { id } = req.params; 
    let total_img = await pool.query('SELECT * FROM imagen i WHERE i.id_evento = ?', [id]);
    if (total_img.length > 0) {
        res.json({
            status: 200,
            message: "Se han obtenidos las imagenes del Evento",
            total_img: total_img
        });
    } else {
        res.json({
            status: 400,
            message: "No hay registro de imagenes de este Evento",
        });
    }
});


router.post('/add', async(req, res) => {
    let { imagen, id_evento } = req.body;
    let imagenB64 = { imagen, id_evento }

    let flag = await pool.query('INSERT INTO imagen SET ?', [imagenB64]);
    if(flag != null){
        res.json = ({
            status: 200,
            message: "Se registro correctamente la Imagen",
        });
    }else{
        res.json = ({
            status: 400,
            message: "Error de registro de la Imagen"
        });
    }
});

module.exports = router;