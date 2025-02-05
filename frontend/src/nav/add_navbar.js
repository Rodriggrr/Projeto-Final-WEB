window.onload = function() {
    document.body.classList.add('loaded');
};

function isTokenValid(token) {
    let payload = token.split('.')[1];
    payload = atob(payload);
    payload = JSON.parse(payload);
    let exp = payload.exp;
    let now = Date.now() / 1000;
    return now < exp;
}

let token = sessionStorage.getItem('jwtToken');
let login_text;


fetch("../src/nav/navbar.html")
.then(response => response.text())
.then(data => {
    document.getElementById("navbar").innerHTML = data;
    
    if(token || isTokenValid(token)) {
            login_text = document.getElementById('log-in-out');
            console.log('token: ' + token)
            login_text.innerText = 'Perfil';
            login_text.href = '../profile/profile.html';
        }
    })
    .catch(error => console.error('Erro ao carregar o navbar:', error));

