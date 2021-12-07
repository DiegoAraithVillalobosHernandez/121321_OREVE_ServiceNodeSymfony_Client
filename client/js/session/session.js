
let div = document.getElementById('l_msg');
let message = sessionStorage.getItem('message');
let state = sessionStorage.getItem('state');

if (message === null || message === "") {
    div.style.display = "none";
} else {
        let content = "";
        content += `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>${message}</strong> 
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            `
        $("#l_msg").html(content);
        sessionStorage.setItem('message', "");
}

const login = async () => {
    let user_email = document.getElementById('user_email').value;
    sessionStorage.setItem('user_email', user_email);
    let userId = await findIdByUserOrEmail(user_email);
    let id = userId.id.id;
    sessionStorage.setItem('userId', id);
    sessionStorage.setItem('message', userId.message);
    sessionStorage.setItem('state', userId.state)
    window.location.replace('./view/home.html');
}
