let alertEvent = document.getElementById('alertCountEvent');
alertEvent.style.display = "none";

const findAll = async() => {
    await $.ajax({
        type: 'GET',
        url: url + '/evento'
    }).done(res => {
        let listEventos = res.listEventos;
        let cont = $('#eventos');

        if(listEventos != null){
            console.log(listEventos);
            for(let i = 0; i < listEventos.length; i++){
                cont.append(
                    "<div class='card bg-light mb-3 pb-0'>"+
                        "<div class='card-header'>"+
                            "<h5>"+ listEventos[i].nombre +"</h5>"+
                        "</div>"+
                        "<div class='card-body'>"+
                        "<h5 class='card-title'>Descripción</h5>" + listEventos[i].descripcion  +
                            "<hr>"+
                            "<div class='row'>"+
                                "<div class='col-6'>"+
                                    "<label>Participantes: <span>"+ listEventos[i].participantes +"</span></label>"+
                                "</div>"+
                                "<div class='col-6 text-right'>"+
                                    "<button type='button' class='btn btn-primary' data-target='#info' data-toggle='modal' onclick='getInfoEvento("+ listEventos[i].id +")'><span class='fas fa-info-circle'></span> Más Información</button>"+
                                "</div>"+
                            "</div>"+
                        "</div>"+
                    "</div>"
                );
            }
        }else{
            alertEvent.style.display = "block";
        }
    });
}

findAll();

const findById = async(id) => {
    return await $.ajax({
        type: 'GET',
        url: url + '/evento/' + id
    }).done(res => res);
}

const getInfoEvento = async(id) => {
    let object = await findById(id);
    console.log(object.evento);
    document.getElementById('event_date_start').innerHTML = object.evento[0].fecha_inicio;
    document.getElementById('event_date_end').innerHTML = object.evento[0].fecha_fin;
    document.getElementById('event_hr_start').innerHTML = object.evento[0].hora_inicio;
    document.getElementById('event_hr_end').innerHTML = object.evento[0].hora_fin;
    document.getElementById('event_state').innerHTML = object.evento[0].estado? "<span class='badge bg-success text-light pl-3 pr-3'>Activo</span>" : "<span class='badge bg-danger text-light pl-3 pr-3'>Terminado</span>";
}

