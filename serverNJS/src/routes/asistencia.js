const express = require('express');
const router = express.Router();
const pool = require('../database.js');
const moment = require('moment');

router.get('/', async (req, res) => { // GetAll
    let listAsistencias = await pool.query('SELECT * FROM asistencia');
    if (listAsistencias.length > 0) {
        res.json({
            status: 200,
            message: "Se han obtenidos los registros de asistencias",
            listAsistencias: listAsistencias
        });
    } else {
        res.json({
            status: 200,
            message: "No hay registro de asistencias",
        });
    }
});

router.get('/:id', async (req, res) => { // GetAll
    let { id } = req.params; 
    let asistencia = await pool.query('SELECT a.id as id_asistencia, e.* FROM asistencia a INNER JOIN evento e ON a.id_evento = e.id WHERE a.id = ?', [id]);
    if (asistencia.length > 0) {
        res.json({
            status: 200,
            message: "Se han obtenidos los registros de asistencias",
            asistencia: asistencia
        });
    } else {
        res.json({
            status: 200,
            message: "No hay registro de asistencias",
        });
    }
});

router.get('/user/:id', async (req, res) => { // GetAsistanceUserById
    const { id } = req.params;
    let listAsistencias = await pool.query('SELECT a.id as id_asistencia, e.* FROM asistencia a INNER JOIN evento e ON a.id_evento = e.id WHERE a.id_usuario = ?', [id]);

    if (listAsistencias.length > 0) {
        res.json({
            status: 200,
            message: "Se han obtenidos los registros de asistencias",
            listAsistencias: listAsistencias
        });
    } else {
        res.json({
            status: 200,
            message: "No hay registros de asistencias",
        });
    }
});

router.post('/add', async(req, res) => {
    let { id_usuario, id_evento } = req.body;

    let asistance = { id_usuario, id_evento }
    let flag = await pool.query('INSERT INTO asistencia SET ?', [asistance]);

    if(flag){
        res.json = ({
            status: 200,
            message: "Se registro correctamente",
            asistance: asistance
        });
    }else{
        res.json = ({
            status: 400,
            message: "Error de registro"
        });
    }
});

router.post('/remove/:id', async(req, res) => {
    let { id } = req.params;
    let flag = await pool.query('DELETE FROM asistencia WHERE id = ?', [id]);

    if(flag){
        res.json = {
            status: 200,
            message: "Se elimino correctamente"
        };
    }else{
        res.json = {
            status: 400,
            message: "Error de eliminacion"
        };
    }
});

module.exports = router;