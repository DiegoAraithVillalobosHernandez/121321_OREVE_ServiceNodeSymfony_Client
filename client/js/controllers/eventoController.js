document.getElementById('c_refresh').disabled = true;
document.getElementById('u_refresh').disabled = true;
document.getElementById('r_refresh').disabled = true;

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
                    "<h5>" + listEventos[i].nombre+ "</h5>" +
                    "</div>" +
                    "<div class='col-6 text-right'>" +
                    (listEventos[i].estado ? "<span class='badge bg-success text-light pl-3 pr-3'>Activo</span>" : "<span class='badge bg-danger text-light pl-3 pr-3'>Terminado</span>") +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "<div class='card-body'>" +
                    "<div class='row'>" +
                    "<div class='col-6'>" +
                    "<h5 class='card-title'>Información del evento</h5>" +
                    "Fecha y hora de inicio: " + listEventos[i].fecha_inicio + " - " + listEventos[i].hora_fin +
                    "<br>"+
                    "Fecha y hora de finalización: " + listEventos[i].fecha_fin + " - " + listEventos[i].hora_fin +
                    "<br>"+
                    "Ubicación: " + listEventos[i].ubicacion +
                    "<br>"+
                    "<br>"+
                    "<h5 class='card-title'>Descripción</h5>" + listEventos[i].descripcion  +
                    "</div>" +
                    "<div class='col-6'>" +
                    "<div id='carouselExampleControls' class='carousel slide' data-ride='carousel'>" +
                    "<div class='carousel-inner'>" +
                    "<div class='carousel-item active'>" +
                    "<img src='../src/img/loaf.svg' class='d-block' alt='...'>" +
                    "</div>" +
                    "</div>" +
                    "<button class='carousel-control-prev' type='button' data-target='#carouselExampleControls' data-slide='prev'>" +
                    "<span class='carousel-control-prev-icon' aria-hidden='true'> </span>" +
                    "<span class='sr-only'> Previous</span>" +
                    "</button>" +
                    "<button class='carousel-control-next' type='button' data-target='#carouselExampleControls' data-slide='next'>" +
                    "<span class='carousel-control-next-icon' aria-hidden='true'> </span>" +
                    "<span class='sr-only'> Next</span>" +
                    "</button>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "<hr>" +
                    "<div class='row'>" +
                    "<div class='col-6'>" +
                    "<label>Participantes: " + listEventos[i].participantes + "</label>" +
                    "</div>" +
                    "<div class='col-6 text-right'>" +
                    "<button class='btn btn-danger mr-2' data-target='#remove' data-toggle='modal' onclick='getIdDeleteEvento("+ listEventos[i].id +")'><span class='fas fa-trash'></span> Eliminar</span></button>" +
                    "<button class='btn btn-primary mr-2' "+ (listEventos[i].estado? "disabled" : "") +"><span class='fas fa-images'></span> Agregar Imagenes</span></button>" +
                    "<button class='btn btn-warning' data-target='#update' data-toggle='modal' onclick='getInfoUpdateEvento("+ listEventos[i].id +")'><span class='fas fa-edit'></span> Modificar</button>" +
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
    let creador = sessionStorage.getItem('userId');

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
                color = "alert-success";
                document.getElementById('c_refresh').disabled = false;
                document.getElementById('c_discard').disabled = true;
                document.getElementById('c_add').disabled = true;
                break;
            case 300:
                color = "alert-warning";
                break
            case 400:
                color = "alert-danger";
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
    let descripcion = document.getElementById('u_eve_description').value === "" ? "" : document.getElementById('u_eve_description').value;
    let creador = sessionStorage.getItem('userId');
    let id = document.getElementById('u_eve_id').value;

    $.ajax({
        type: 'POST',
        url: url + '/evento/update/' + id,
        data: {
            nombre, ubicacion, hora_inicio, hora_fin,
            fecha_inicio, fecha_fin, descripcion, creador
        }
    }).done(function (res) {
        let color = "";
        switch (res.status) {
            case 200:
                color = "alert-success";
                document.getElementById('u_refresh').disabled = false;
                document.getElementById('u_discard').disabled = true;
                document.getElementById('u_update').disabled = true;
                break;
            case 300:
                color = "alert-warning";
                break
            case 400:
                color = "alert-danger";
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

const getInfoUpdateEvento = async(id) => {
    return await $.ajax({
        type: 'GET',
        url: url + '/evento/' + id
    }).done(res => {
        let evento = res.evento[0];
        document.getElementById('u_eve_id').value = evento.id;
        document.getElementById('u_eve_name').value = evento.nombre;
        document.getElementById('u_eve_date_start').value = evento.fecha_inicio;
        document.getElementById('u_eve_date_end').value = evento.fecha_fin;
        document.getElementById('u_eve_hr_start').value = evento.hora_inicio;
        document.getElementById('u_eve_hr_end').value = evento.hora_fin;
        document.getElementById('u_eve_location').value = evento.ubicacion;
        document.getElementById('u_eve_description').value = evento.descripcion;
    });
}

const deleteEvento = () => {
    let id = document.getElementById('r_eve_id').value;
    $.ajax({
        type: 'POST',
        url: url + '/evento/delete/' + id,
    }).done(function (res) {
        let color = "";
        switch (res.status) {
            case 200:
                color = "alert-success";
                document.getElementById('r_refresh').disabled = false;
                document.getElementById('r_discard').disabled = true;
                document.getElementById('r_del').disabled = true;
                break;
            case 400:
                color = "alert-danger";
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
        $("#r_msg").html(content);
    })
}

const getIdDeleteEvento = (id) => {
    document.getElementById('r_eve_id').value = id;
    
}