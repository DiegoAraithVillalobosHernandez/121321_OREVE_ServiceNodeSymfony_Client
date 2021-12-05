
document.getElementById('u_usr_nombre').disabled = true;
document.getElementById('u_usr_appa').disabled = true;
document.getElementById('u_usr_apma').disabled = true;
document.getElementById('btn_disc_usr_info').disabled = true;
document.getElementById('btn_save_usr_info').disabled = true;

document.getElementById('u_usr_email').disabled = true;
document.getElementById('u_usr_password').disabled = true;
document.getElementById('u_usr_conf_password').disabled = true;
document.getElementById('btn_disc_usr_usr').disabled = true;
document.getElementById('btn_save_usr_usr').disabled = true;

document.getElementById('wrnInfo').style.display = "none";
document.getElementById('wrnUser').style.display = "none";

const editPersonalData = () => {
    document.getElementById('u_usr_nombre').disabled = false;
    document.getElementById('u_usr_appa').disabled = false;
    document.getElementById('u_usr_apma').disabled = false;
    document.getElementById('btn_disc_usr_info').disabled = false;
    document.getElementById('btn_save_usr_info').disabled = false;
    document.getElementById('wrnInfo').style.display = "block";

}

const editUserData = () => {
    document.getElementById('u_usr_email').disabled = false;
    document.getElementById('u_usr_password').disabled = false;
    document.getElementById('u_usr_conf_password').disabled = false;
    document.getElementById('btn_disc_usr_usr').disabled = false;
    document.getElementById('btn_save_usr_usr').disabled = false;
    document.getElementById('wrnUser').style.display = "block";
}

const infoDiscard = () => {
    document.getElementById('u_usr_nombre').disabled = true;
    document.getElementById('u_usr_appa').disabled = true;
    document.getElementById('u_usr_apma').disabled = true;
    document.getElementById('btn_disc_usr_info').disabled = true;
    document.getElementById('btn_save_usr_info').disabled = true;
    document.getElementById('wrnInfo').style.display = "none";

}

const userDiscard = () => {
    document.getElementById('u_usr_email').disabled = true;
    document.getElementById('u_usr_password').disabled = true;
    document.getElementById('u_usr_conf_password').disabled = true;
    document.getElementById('btn_disc_usr_usr').disabled = true;
    document.getElementById('btn_save_usr_usr').disabled = true;
    document.getElementById('wrnUser').style.display = "none";
}