checkAdminRole();

function logout() {
    sessionStorage.removeItem('jwtToken');
    sessionStorage.removeItem('admin');
    window.location.href = '/';
}

document.addEventListener('DOMContentLoaded', () => {
    let users = document.getElementById('users');
    users.addEventListener('click', () => {
        console.log('users');
        window.location.href = './list.html?type=usuarios';
    });

    let atracaos = document.getElementById('atracaos');
    atracaos.addEventListener('click', () => {
        console.log('atracaos');
        window.location.href = './list.html?type=atracaos';
    });

    let avaliacoes = document.getElementById('avaliacoes');
    avaliacoes.addEventListener('click', () => {
        console.log('avaliacoes');
        window.location.href = './list.html?type=avaliacoes';
    });
});


function checkAdminRole() {
    fetch('http://localhost:1337/api/users/me?populate=role', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('jwtToken')}`
        }
    })
    .then(response => {
        if (!response.ok) throw new Error('Algo deu errado: ' + response.status);
        return response.json();
    })
    .then(data => {
        let role = data.role.nome;
        if (role !== 'admin') {
            window.location.href = '../404';
        }
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}