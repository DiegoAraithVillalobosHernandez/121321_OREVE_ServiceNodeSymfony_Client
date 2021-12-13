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

router.get('/nui/:id', async (req, res) => { // GetAll
    let { id } = req.params;
    let listEventos = await pool.query('SELECT * FROM evento WHERE creador != ?', [id]);
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

router.get('/mine/:id', async (req, res) => { // GetEventsByUser
    const { id } = req.params;
    let fecha_actual = await actualDate();
    await pool.query('UPDATE evento SET estado = 0 WHERE fecha_fin < ? AND creador = ?',[fecha_actual,id]);
    await pool.query('UPDATE evento SET estado = 1 WHERE fecha_fin >= ? AND creador = ?',[fecha_actual,id]);
    let listEventos = await pool.query('SELECT e.*, i.imagen FROM evento e LEFT JOIN imagen i ON e.id = i.id_evento WHERE e.creador = ? ORDER BY e.id', [id]);

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

router.post('/create', async (req, res) => {
    const { nombre, ubicacion, hora_inicio, hora_fin,
        fecha_inicio, fecha_fin, descripcion, creador } = req.body;
    const evento = {
        nombre, ubicacion, creador,
        hora_inicio, hora_fin, fecha_inicio, fecha_fin,
        descripcion
    };
    if (validateDate(fecha_inicio)) {
        if (compareDate(fecha_fin, fecha_inicio)){
            if (sameDate(fecha_fin, fecha_inicio)) {
                if (compareTime(hora_fin, hora_inicio)) {
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
                            message: "Error interno al registrar Evento",
                            evento: evento
                        });
                    }
                } else {
                    res.json({
                        status: 300,
                        message: "La hora de fin es menor a la hora de inicio",
                        evento: evento
                    });
                }
            } else {
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
                            message: "Error interno al registrar Evento",
                            evento: evento
                        });
                    }
            }
        }else {
            res.json({
                status: 300,
                message: "La fecha de fin es menor a la fecha de inicio",
                evento: evento
            });
        }
    } else {
        res.json({
            status: 300,
            message: "La fecha de inicio esta vencida",
            evento: evento
        });
    }

});

router.post('/update/:id', async (req, res) => {
    const { nombre, ubicacion, hora_inicio, hora_fin,
        fecha_inicio, fecha_fin, descripcion, creador } = req.body;
    const { id } = req.params;
    const evento = {
        nombre, ubicacion,
        hora_inicio, hora_fin, fecha_inicio, fecha_fin,
        descripcion
    };

    if (isTheCreator(id, creador)) {
        if (validateDate(fecha_inicio)) {
            if (compareDate(fecha_fin, fecha_inicio)){
                if (sameDate(fecha_fin, fecha_inicio)) {
                    if (compareTime(hora_fin, hora_inicio)) {
                        let flag = await pool.query('UPDATE evento SET ? WHERE id = ?', [evento, id]);
                        if (flag) {
                            res.json({
                                status: 200,
                                message: "Se ha actualizado correctamente el Evento",
                                evento: evento
                            });
                        } else {
                            res.json({
                                status: 400,
                                message: "Error interno al actualizar Evento",
                                evento: evento
                            });
                        }
                    } else {
                        res.json({
                            status: 300,
                            message: "La hora de fin es menor a la hora de inicio",
                            evento: evento
                        });
                    }
                } else {
                    let flag = await pool.query('UPDATE evento SET ? WHERE id = ?', [evento, id]);
                        if (flag) {
                            res.json({
                                status: 200,
                                message: "Se ha actualizado correctamente el Evento",
                                evento: evento
                            });
                        } else {
                            res.json({
                                status: 400,
                                message: "Error interno al actualizar Evento",
                                evento: evento
                            });
                        }
                }
            }else {
                res.json({
                    status: 300,
                    message: "La fecha de fin es menor a la fecha de inicio",
                    evento: evento
                });
            }
        } else {
            res.json({
                status: 300,
                message: "La fecha de inicio esta vencida",
                evento: evento
            });
        }
    } else {
        res.json({
            status: 300,
            message: "Error al actualizar Evento, no es propietario de dicho Evento"
        });
    }
});

router.post('/addAsistance/:id', async (req, res) => {
    const { id } = req.params;

    let flag = await pool.query('UPDATE evento SET participantes = (participantes + 1) WHERE id = ?', [id]);
    if (flag) {
        res.json({
            status: 200,
            message: "Se ha agregado una asitencia"
        });
    } else {
        res.json({
            status: 400,
            message: "Error interno al actualizar Evento"
        });
    }
});

router.post('/removeAsistance/:id', async (req, res) => {
    const { id } = req.params;

    let flag = await pool.query('UPDATE evento SET participantes = (participantes - 1) WHERE id = ?', [id]);
    if (flag) {
        res.json({
            status: 200,
            message: "Se ha quitado una asitencia"
        });
    } else {
        res.json({
            status: 400,
            message: "Error interno al actualizar Evento"
        });
    }
});

router.post('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM imagen WHERE id_evento = ?',[id])
    let flag = await pool.query('DELETE FROM evento WHERE id = ?', [id]);
    if (flag) {
        pool.query('DELETE FROM asistencia WHERE id_evento = ?', [id]);
        res.json({
            status: 200,
            message: "Se ha eliminado correctamente el Evento"
        });
    } else {
        res.json({
            status: 400,
            message: "Error interno al actualizar Evento"
        });
    }

});

router.post('/remove/user/:id', async (req, res) => { // remueve los eventos de es usuario
    const { id } = req.params;

    let flag = await pool.query('DELETE FROM evento WHERE creador = ?', [id]);
    if (flag) {
        res.json({
            status: 200,
            message: "Se ha eliminado correctamente el Evento"
        });
    } else {
        res.json({
            status: 400,
            message: "Error interno al actualizar Evento"
        });
    }

});

async function isTheCreator(id, creador) {
    let flag = await pool.query("SELECT * FROM evento WHERE id = ? AND creador = ?", [id, creador]);

    if (flag.length > 0) return true;
    else return false;
}

function validateDate(dateTimeA) {
    if (moment(moment(dateTimeA).format('YYYY/MM/DD')).isSameOrAfter((moment(new Date()).format('YYYY/MM/DD')))) return true;
    else return false;
}

function compareDate(dateTimeA, dateTimeB) {
    var momentA = moment(dateTimeA).format('YYYY/MM/DD');;
    var momentB = moment(dateTimeB).format('YYYY/MM/DD');;
    if (momentA >= momentB) return true;
    else return false;
}
function compareTime(TimeA, TimeB) {
    if (moment(TimeA, 'hh:mm').isAfter(moment(TimeB, 'hh:mm'))) return true;
    else return false;
}

function sameDate(dateTimeA, dateTimeB) {
    if (moment(dateTimeA,'YYYY/MM/DD').isSame(moment(dateTimeB,'YYYY/MM/DD'))) return true;
    else return false;
}
function actualDate() {
    return moment().format('YYYY-MM-DD');
}
module.exports = router;