if(!estaLogado()) window.location.href = './login.html';
checkAdminRole();
setTimeout(() => {
    document.body.style.display = 'block';
}, 500);


function logout() {
    sessionStorage.removeItem('jwtToken');
    sessionStorage.removeItem('admin');
    window.location.href = '/';
}

document.addEventListener('DOMContentLoaded', () => {
    let users = document.getElementById('users');
    users.addEventListener('click', () => {
        console.log('users');
        window.location.href = './list.html?type=users';
    });

    let atracaos = document.getElementById('atracaos');
    atracaos.addEventListener('click', () => {
        console.log('atracaos');
        window.location.href = './list.html?type=atracaos';
    });

    let avaliacoes = document.getElementById('avaliacoes');
    avaliacoes.addEventListener('click', () => {
        console.log('avaliacoes');
        window.location.href = './list.html?type=avaliacaos';
    });
});

