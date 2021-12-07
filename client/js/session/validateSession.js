
let user_email = sessionStorage.getItem('user_email');
let userId = sessionStorage.getItem('userId');
if(userId === null || userId === "undefined"){
    window.location.replace('../index.html');
}

const logout = () => {
    sessionStorage.setItem('user_email', "");
    sessionStorage.setItem('userId', 0);
    sessionStorage.setItem('state', 0);
    sessionStorage.setItem('message', "");
    window.location.replace('../index.html');
}