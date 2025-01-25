window.onload = function() {
    document.body.classList.add('loaded');
};

document.addEventListener("DOMContentLoaded", () => {
    fetch("../src/nav/navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar").innerHTML = data;
        })
        .catch(error => console.error('Erro ao carregar o navbar:', error));
});



