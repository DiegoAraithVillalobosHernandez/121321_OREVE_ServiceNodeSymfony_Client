
let user = sessionStorage.getItem('user');
let userId = sessionStorage.getItem('userId');

if(userId === "undefined" || userId == 0){
    sessionStorage.setItem('status', 'INV_SESSION');
    window.location.replace('../index.html');
}

const logout = () => {
    sessionStorage.setItem('userId', null);
    sessionStorage.setItem('user', null);
    window.location.replace('../index.html');
}