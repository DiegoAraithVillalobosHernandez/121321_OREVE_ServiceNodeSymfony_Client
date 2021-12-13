
let id_asis = 0;

const getMyAsistances = async() => {
    let id = sessionStorage.getItem('userId');
    
    await $.ajax({
        type: 'GET',
        url: url + '/asistencia/user/' + id
    }).done(res => {
        let listAsistencias = res.listAsistencias;
        let today = new Date();
        let divAsis = $('#misAsistencias');
        let divNot = $('#notify');
        let n = 0;
        
        if(listAsistencias != null){
            for(let i = 0; i < listAsistencias.length; i++){
                if(checkNotifications(today, listAsistencias[i].fecha_inicio)){
                    n++;
                    divNot.append(
                         "<div class='card bg-light mb-3 pb-0'>"+
                         "<div class='card-header'>"+
                         "<h5>El siguiente evento está por comenzar.</h5>"+
                         "</div>"+
                         "<div class='card-body'>"+
                         "<label class='card-text'>"+ listAsistencias[i].nombre +"</label><br>"+
                         "<label class='card-text'>El "+ listAsistencias[i].fecha_inicio +" a la(s) "+ listAsistencias[i].hora_inicio +"</label>"+
                         "</div>"+
                         "</div>"
                    );
                }
                divAsis.append(
                    "<div class='card bg-light mb-3 pb-0'>" +
                    "<div class='card-header'>" +
                    "<h5>"+ listAsistencias[i].nombre +"</h5>" +
                    "</div>" +
                    "<div class='card-body'>" +
                    "<h5 class='card-title'>Descripción</h5>" + listAsistencias[i].descripcion +
                    "<hr>" +
                    "<div class='row'>" +
                    "<div class='col-12 text-right'>" +
                    "<button type='button' class='btn btn-primary' data-target='#info' data-toggle='modal' onclick='getInfoEvento(" + listAsistencias[i].id_asistencia + ")'><span class='fas fa-info-circle'></span> Ver Información</button>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>"
                );
            }
        }

        if(n > 0){
            document.getElementById('not_count').innerHTML = n;
            document.getElementById('not_count_nav').innerHTML = n;
        }else{
            document.getElementById('not_count').style.display = "none";
            document.getElementById('not_count_nav').style.display = "none";
        }
    });
}

getMyAsistances();

const findById = async(id) => {
    return await $.ajax({
        type: 'GET',
        url: url + '/asistencia/' + id
    }).done(res => res);
}

const getInfoEvento = async(id) => {
    let object = await findById(id);
    document.getElementById('asis_id').value = id;
    document.getElementById('event_date_start').innerHTML = object.asistencia[0].fecha_inicio;
    document.getElementById('event_date_end').innerHTML = object.asistencia[0].fecha_fin;
    document.getElementById('event_hr_start').innerHTML = object.asistencia[0].hora_inicio;
    document.getElementById('event_hr_end').innerHTML = object.asistencia[0].hora_fin;
    document.getElementById('event_state').innerHTML = object.asistencia[0].estado? "<span class='badge bg-success text-light pl-3 pr-3'>Activo</span>" : "<span class='badge bg-danger text-light pl-3 pr-3'>Terminado</span>";
}