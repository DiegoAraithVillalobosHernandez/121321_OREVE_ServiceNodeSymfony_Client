const express = require('express');
const router = express.Router();
const pool = require('../database.js');
const moment = require('moment');

router.get('/', async (req, res) => { // GetAll
    let listEventos = await pool.query('SELECT * FROM evento');
    if (listEventos.length > 0) {
        res.json({
            status: 200,
            message: "Se han obtenidos los registros de Eventos",
            listEventos: listEventos
        })
    } else {
        res.json({
            status: 200,
            message: "No hay registros de Eventos",
        })
    }

});

router.get('/:id', async (req, res) => { // GetById
    const { id } = req.params;
    let evento = await pool.query('SELECT * FROM evento WHERE id = ?', [id]);
    if (evento.length > 0) {
        res.json({
            status: 200,
            message: "Se han obtenidos los registros del Evento",
            evento: evento
        })
    } else {
        res.json({
            status: 200,
            message: "No hay registros de tal Evento",
        })
    }
});

router.post('/create', async (req, res) => { // Create
    const { nombre, calle, estado, municipio, hora_inicio, hora_fin,
        fecha_inicio, fecha_fin, descripcion, creador } = req.body;
    let ubicacion = `${calle} ${estado}, ${municipio}`;
    const evento = {
        nombre, ubicacion, creador,
        hora_inicio, hora_fin, fecha_inicio, fecha_fin,
        descripcion
    };

    // ingresar fechas actuales añadir = min="2016-01-01"
    // faltan datos usarlo como required
    console.log(compareDate(fecha_fin, fecha_inicio));
    if (compareDate(fecha_fin, fecha_inicio)) {
        if (parseFloat(hora_fin) > parseFloat(hora_inicio)) {
            let flag = await pool.query('INSERT INTO evento SET ?', [evento]);

            if (flag) {
                res.json({
                    status: 200,
                    message: "Se ha registrado correctamente el Evento",
                    evento: evento
                });
            } else {
                res.json({
                    status: 400,
                    message: "Error al registrar Evento, verifique los datos",
                    evento: evento
                });
            }
        } else {
            res.json({
                status: 400,
                message: "La hora de fin es menor a la hora de inicio, verifique los datos",
                evento: evento
            });
        }
    } else {
        res.json({
            status: 400,
            message: "La fecha de fin es menor a la fecha de inicio, verifique los datos",
            evento: evento
        });
    }
});

router.post('/update/:id', async (req, res) => {
    const { nombre, calle, estado, municipio, país, hora_inicio, hora_fin,
        fecha_inicio, fecha_fin, descripcion, creador } = req.body;
    let ubicacion = `${calle} ${estado}, ${municipio}`;
    const { id } = req.params;
    const evento = {
        nombre, ubicacion,
        hora_inicio, hora_fin, fecha_inicio, fecha_fin,
        descripcion
    };
    if (isTheCreator(id, creador)) {
        if (compareDate(fecha_fin, fecha_inicio)) {
            if (parseFloat(hora_fin) > parseFloat(hora_inicio)) {
                let flag = await pool.query('UPDATE evento SET ? WHERE id = ?', [evento,id]);

                if (flag) {
                    res.json({
                        status: 200,
                        message: "Se ha actualizado correctamente el Evento",
                        evento: evento
                    });
                } else {
                    res.json({
                        status: 400,
                        message: "Error al actualizar Evento, verifique los datos",
                        evento: evento
                    });
                }
            } else {
                res.json({
                    status: 400,
                    message: "La hora de fin es menor a la hora de inicio, verifique los datos",
                    evento: evento
                });
            }
        } else {
            res.json({
                status: 400,
                message: "La fecha de fin es menor a la fecha de inicio, verifique los datos",
                evento: evento
            });
        }
    } else {
        res.json({
            status: 400,
            message: "Error al actualizar Evento, no es propietario de dicho Evento"
        });
    }
});

router.post('/delete/:id', async (req, res) => {
    const { id } = req.params;
    const { creador } = req.body;

    if (await isTheCreator(id, creador)) {

        await pool.query('DELETE FROM evento WHERE id = ?', [id]);

        res.json({
            status: 200,
            message: "Se ha eliminado correctamente el Evento"
        });
    } else {
        res.json({
            status: 400,
            message: "Error al eliminar Evento, no es propietario de dicho Evento"
        });
    }
});

async function isTheCreator(id, creador) {
    let flag = await pool.query("SELECT * FROM evento WHERE id = ? AND creador = ?", [id, creador]);
    console.log(flag)

    if (flag.length > 0) return true;
    else return false;
}

function compareDate(dateTimeA, dateTimeB) {
    var momentA = moment(dateTimeA).format('YYYY/MM/DD');;
    var momentB = moment(dateTimeB).format('YYYY/MM/DD');;
    if (momentA >= momentB) return true;
    else return false;
}

module.exports = router;