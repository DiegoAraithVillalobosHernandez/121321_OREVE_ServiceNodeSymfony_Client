
const findById = async() => {
    return await $.ajax({
        type: 'GET',
        url: url2 + '/usuario/' + userId
    }).done(res => res);
}

const setData = async() => {
    let data = await findById(userId);
    console.log(data);

    document.getElementById('u_usr_nombre').value = data.usuario[0].nombre;
    document.getElementById('u_usr_appa').value = data.usuario[0].apPaterno;
    document.getElementById('u_usr_apma').value = data.usuario[0].apMaterno;
    document.getElementById('u_usr_usr').value = data.usuario[0].usuario;
    document.getElementById('u_usr_email').value = data.usuario[0].correo;
    document.getElementById('u_usr_password').value = data.usuario[0].keyword;
    document.getElementById('u_usr_conf_password').value = data.usuario[0].keyword;
}

setData();

const updateInfo = () => {
    
}