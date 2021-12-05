
let user = sessionStorage.getItem('user');

if(user === ""){
    sessionStorage.setItem('msg', 1);
    window.location.replace('../index.html');
}

const logout = () => {
    sessionStorage.setItem('user', "");
    sessionStorage.setItem('msg', 0);
    window.location.replace('../index.html');
}