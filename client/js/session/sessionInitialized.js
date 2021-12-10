let userId = sessionStorage.getItem('userId');
console.log(userId);

if(userId != 0 && userId != "undefined"){
    window.location.replace('./view/home.html');
}