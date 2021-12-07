
let userId = sessionStorage.getItem('userId');
const url = 'http://localhost:4000';

const findAllMines = async () => {
    await $.ajax({
        type: 'GET',
        url: url + '/evento/mine/' + userId
    }).done(res => {
        let listEventos = res.listEventos;
        let cont = $('#misEventos');

        if (listEventos != null) {
            for (let i = 0; i < listEventos.length; i++) {
                cont.append(
                    "<div class='card bg-light mb-3'>" +
                    "<div class='card-header'>" +
                    "<div class='row'>" +
                    "<div class='col-6'>" +
                    "<h5>" + listEventos[i].nombre + "</h5>" +
                    "</div>" +
                    "<div class='col-6 text-right'>" +
                    (listEventos[i].estado ? "<span class='badge bg-success text-light pl-3 pr-3'>Activo</span>" : "<span class='badge bg-danger text-light pl-3 pr-3'>Terminado</span>") +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "<div class='card-body'>" +
                    "<h5 class='card-title'>Información del evento</h5>" +
                    "<hr>" +
                    "<div class='row'>" +
                    "<div class='col-6'>" +
                    "<label>Participantes: " + listEventos[i].participantes + "</label>" +
                    "</div>" +
                    "<div class='col-6 text-right'>" +
                    "<button class='btn btn-danger mr-2' data-target='#remove' data-toggle='modal'><span class='fas fa-trash'></span> Eliminar</span></button>" +
                    "<button class='btn btn-primary mr-2' disabled><span class='fas fa-images'></span> Agregar Imagenes</span></button>" +
                    "<button class='btn btn-warning' data-target='#update' data-toggle='modal'><span class='fas fa-edit'></span> Modificar</button>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>"
                );
            }
        }
    });
}

findAllMines();


const createEvento = () => {
    let nombre = document.getElementById('c_eve_name').value;
    let ubicacion = document.getElementById('c_eve_location').value;
    let hora_inicio = document.getElementById('c_eve_hr_start').value;
    let hora_fin = document.getElementById('c_eve_hr_end').value;
    let fecha_inicio = document.getElementById('c_eve_date_start').value;
    let fecha_fin = document.getElementById('c_eve_date_end').value;
    let descripcion = document.getElementById('c_eve_description').value === "" ? "" : document.getElementById('c_eve_description').value;
    let creador = 1;

    $.ajax({
        type: 'POST',
        url: url + '/evento/create',
        data: {
            nombre, ubicacion, hora_inicio, hora_fin,
            fecha_inicio, fecha_fin, descripcion, creador
        }
    }).done(function (res) {
        let color = "";
        switch (res.status) {
            case 200:
                color = "alert-success"
                break;
            case 300:
                color = "alert-warning"
                break
            case 400:
                color = "alert-danger"
        }
        let content = "";
        content += `
        <div class="alert ${color} alert-dismissible fade show" role="alert">
        <strong>${res.message}</strong> 
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        </div>
        `
        $("#c_msg").html(content);
    })
}

const updateEvento = () => {
    let nombre = document.getElementById('u_eve_name').value;
    let ubicacion = document.getElementById('u_eve_location').value;
    let hora_inicio = document.getElementById('u_eve_hr_start').value;
    let hora_fin = document.getElementById('u_eve_hr_end').value;
    let fecha_inicio = document.getElementById('u_eve_date_start').value;
    let fecha_fin = document.getElementById('u_eve_date_end').value;
    let descripcion = document.getElementById('u_eve_description').value === "" ? "" : document.getElementById('c_eve_description').value;
    let creador = 1;
    let id = document.getElementById('u_eve_id').value;

    $.ajax({
        type: 'POST',
        url: url + '/evento/update/' + 1,
        data: {
            nombre, ubicacion, hora_inicio, hora_fin,
            fecha_inicio, fecha_fin, descripcion, creador
        }
    }).done(function (res) {
        let color = "";
        switch (res.status) {
            case 200:
                color = "alert-success"
                break;
            case 300:
                color = "alert-warning"
                break
            case 400:
                color = "alert-danger"
        }
        let content = "";
        content += `
        <div class="alert ${color} alert-dismissible fade show" role="alert">
        <strong>${res.message}</strong> 
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        </div>
        `
        $("#u_msg").html(content);
    })
}


