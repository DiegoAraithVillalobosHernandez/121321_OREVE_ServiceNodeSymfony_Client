
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

const findIdByUserOrEmail = async(user_email, password) => {
    return await $.ajax({
        type: 'GET',
        url: url2 + '/usuario/findId',
        data: {user_email, password}
    }).done(res => res);
}

const login = async () => {
    let user_email = document.getElementById('user_email').value;
    let password = document.getElementById('user_password').value;
    sessionStorage.setItem('user_email', user_email);
    let userId = await findIdByUserOrEmail(user_email, password);
    sessionStorage.setItem('userId', userId.id.id);
    sessionStorage.setItem('message', userId.message);
    sessionStorage.setItem('state', userId.state)
    window.location.replace('./view/home.html');
}
