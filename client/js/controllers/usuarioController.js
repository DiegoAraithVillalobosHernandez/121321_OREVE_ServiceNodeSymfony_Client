const findIdByUserOrEmail = async(user_email) => {
    return await $.ajax({
        type: 'GET',
        url: url2 + '/usuario/id/' + user_email
    }).done(res => res);
}