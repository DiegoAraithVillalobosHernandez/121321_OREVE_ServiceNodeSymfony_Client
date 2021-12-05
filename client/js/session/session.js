
let div = document.getElementById('alert');
let state = sessionStorage.getItem('msg');

if(state == 0 || state === null){
    div.style.display = "none";
}else if(state == 1){
    div.style.display = "block";
}

const login = () => {
    let user = document.getElementById('user_email').value;
    sessionStorage.setItem('user', user);
    window.location.replace('./view/home.html');
}
