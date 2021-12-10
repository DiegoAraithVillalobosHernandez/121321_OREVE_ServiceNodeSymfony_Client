
let id = sessionStorage.getItem('userId');

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

const updateInfo = async() => {
    let nombre = document.getElementById('u_usr_nombre').value;
    let ap_paterno = document.getElementById('u_usr_appa').value;
    let ap_materno = document.getElementById('u_usr_apma').value;

    await $.ajax({
        type: 'POST',
        url: url2 + '/usuario/update/info/' + userId,
        data: { nombre, ap_paterno, ap_materno }
    }).done(res => {
        console.log(res.status);
    });
}

const updateUser = async() => {
    let usuario = document.getElementById('u_usr_usr').value;
    let correo = document.getElementById('u_usr_email').value;
    let keyword = document.getElementById('u_usr_password').value;
    let conf = document.getElementById('u_usr_conf_password').value;

    if(keyword === conf){
        await $.ajax({
            type: 'POST',
            url: url2 + '/usuario/update/user/' + userId,
            data: { usuario, correo, keyword }
        }).done(res => {
            console.log(res.status);
            sessionStorage.setItem('user_email', usuario);
        });
    }else{
        console.log('Las contraseñas no coinciden');
    }
}

const removeUser = async() => {
    let password = document.getElementById('r_user_pass').value;
    let conf = document.getElementById('r_user_conf_pass').value;

    if(password === conf){
        await $.ajax({
            type: 'POST',
            url: url2 + '/usuario/remove/' + id
        }).done(res => {
            window.location.replace('../index.html');
        });
    }
}