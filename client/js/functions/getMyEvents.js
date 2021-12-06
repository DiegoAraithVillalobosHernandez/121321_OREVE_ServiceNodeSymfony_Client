
let userId = sessionStorage.getItem('userId');
const url = 'http://localhost:4000';

const findAllMines = async() => {
    await $.ajax({
        type:'GET',
        url: url + '/evento/mine/' + userId
    }).done(res => {
        let listEventos = res.listEventos;
        let cont = $('#misEventos');

        if(listEventos != null){
            for(let i = 0; i < listEventos.length; i++){
                cont.append(
                    "<div class='card bg-light mb-3'>"+
                    "<div class='card-header'>"+
                        "<div class='row'>"+
                            "<div class='col-6'>"+
                                "<h5>"+ listEventos[i].nombre +"</h5>"+
                            "</div>"+
                            "<div class='col-6 text-right'>"+
                                (listEventos[i].estado? "<span class='badge bg-success text-light pl-3 pr-3'>Activo</span>" : "<span class='badge bg-danger text-light pl-3 pr-3'>Terminado</span>")+
                            "</div>"+
                        "</div>"+
                    "</div>"+
                    "<div class='card-body'>"+
                        "<h5 class='card-title'>Información del evento</h5>"+
                        "<hr>"+
                        "<div class='row'>"+
                            "<div class='col-6'>"+
                                "<label>Participantes: "+ listEventos[i].participantes +"</label>"+
                            "</div>"+
                            "<div class='col-6 text-right'>"+
                                "<button class='btn btn-danger mr-2' data-target='#remove' data-toggle='modal'><span class='fas fa-trash'></span> Eliminar</span></button>"+
                                "<button class='btn btn-primary mr-2' disabled><span class='fas fa-images'></span> Agregar Imagenes</span></button>"+
                                "<button class='btn btn-warning' data-target='#update' data-toggle='modal'><span class='fas fa-edit'></span> Modificar</button>"+
                            "</div>"+
                        "</div>"+
                    "</div>"+
                "</div>"
                );
            }
        }
    });
}

findAllMines();