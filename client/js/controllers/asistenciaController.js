
const findAllAsistance = async() => {
    await $.ajax({
        type: 'GET',
        url: url + '/asistencia'
    }).done(res => res);
}

const addAsistance = async() => {
    let id_usuario = sessionStorage.getItem('userId');
    let id_evento = document.getElementById('event_id').value;

    console.log(id_usuario);

    await $.ajax({
        type: 'POST',
        url: url + '/asistencia/add',
        data: { id_usuario, id_evento }
    }).done(res => res);
}

const removeAsistance = async() => {
    let id = document.getElementById('asis_id').value;

    await $.ajax({
        type: 'POST',
        url: url + '/asistencia/remove/' + id
    }).done(res => res);
}