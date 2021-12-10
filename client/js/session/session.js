
let ste = sessionStorage.getItem('status');
let al_sess = document.getElementById('al_sess');
al_sess.style.display = "none";

console.log(ste);

if(ste === 'INV_SESSION'){
    al_sess.style.display = "block";
}else{
    al_sess.style.display = "none";
}

const findIdByUserOrEmail = async(user_email, password) => {
    return await $.ajax({
        type: 'GET',
        url: url2 + '/usuario/findId',
        data: {user_email, password}
    }).done(res => res);
}

const login = async () => {
    let user = document.getElementById('user_email').value;
    let password = document.getElementById('user_password').value;

    let userId = await findIdByUserOrEmail(user, password);

    sessionStorage.setItem('status', '');
    sessionStorage.setItem('user', user);
    sessionStorage.setItem('userId', userId.id.id);
    window.location.replace('./view/home.html');
}
