
document.getElementById('al_add').style.display = "none";
document.getElementById('al_err').style.display = "none";
document.getElementById('al_pass').style.display = "none";

const create = async() => {
    let usuario = document.getElementById('c_usr_usr').value;
    let correo = document.getElementById('c_usr_email').value;
    let keyword = document.getElementById('c_usr_password').value;
    let conf = document.getElementById('c_usr_password_conf').value;
    let nombre = document.getElementById('c_usr_name').value;
    let ap_paterno = document.getElementById('c_usr_appa').value;
    let ap_materno = document.getElementById('c_usr_apma').value;

    if(keyword === conf){
        await $.ajax({
            type: 'POST',
            url: url2 + '/usuario/create',
            data: { nombre, ap_paterno, ap_materno, usuario, correo, keyword }
        }).done(res => {
            al_add.style.display = "block";
        });
    }else{
        al_add.style.display = "none";
        al_pass.style.display = "block";
        al_err.style.display = "none";
    }
}