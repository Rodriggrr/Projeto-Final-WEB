let form = document.getElementById('form');

let URL = 'http://localhost:1337/api';

async function login(email, senha) {
    let response = fetch(`${URL}/auth/local`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            identifier: email,
            password: senha
        })
    })
    .then((response) => {
        if(!response.ok) throw new Error('Email ou senha invalidos.');
        return response;
    })
    .then(response => response.json())
    .then((response) => {
        sessionStorage.setItem('jwtToken', response.jwt);
        console.log(JSON.stringify(response));
        window.location.href = '../home';
    })
    .catch(error => {
        console.log(error);
    })
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let email = document.getElementById('usuario').value;
    let senha = document.getElementById('senha').value;
    login(email, senha);
})