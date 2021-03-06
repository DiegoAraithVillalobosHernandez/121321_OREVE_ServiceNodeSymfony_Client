
const findAllAsistanceByUserId = async() => {
    let id = sessionStorage.getItem('userId');
    let today = new Date();
    let n = 0;

    await $.ajax({
        type: 'GET',
        url: url + '/asistencia/user/' + id
    }).done(res => {
        let listAsistencias = res.listAsistencias;
        
        if(listAsistencias != null){
            for(let i = 0; i < listAsistencias.length; i++){
                if(checkNotifications(today, listAsistencias[i].fecha_inicio)){
                    n++;
                }
            }
        }

        if(n > 0){
            document.getElementById('not_count_nav').innerHTML = n;
        }else{
            document.getElementById('not_count_nav').style.display = "none";
        }
    });
}

const addAsistance = async() => {
    let id_usuario = sessionStorage.getItem('userId');
    let id_evento = document.getElementById('event_id').value;

    document.getElementById('al_conf_asis').style.display = "block";
    incrementAsistantces(id_evento);

    await $.ajax({
        type: 'POST',
        url: url + '/asistencia/add',
        data: { id_usuario, id_evento }
    }).done(res => res);
}

const incrementAsistantces = async(id) => {
    await $.ajax({
        type: 'POST',
        url: url + '/evento/addAsistance/' + id
    }).done(res => res);
}

const removeAsistance = async() => {
    let id_usuario = sessionStorage.getItem('userId');
    let id_evento = document.getElementById('event_id').value;

    document.getElementById('al_desconf_asis').style.display = "block";
    decreaseAsistantces(id_evento);

    await $.ajax({
        type: 'POST',
        url: url + '/asistencia/remove',
        data: { id_usuario, id_evento }
    }).done(res => res);
}

const decreaseAsistantces = async(id) => {
    await $.ajax({
        type: 'POST',
        url: url + '/evento/removeAsistance/' + id
    }).done(res => res);
}