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

document.addEventListener("mousemove", (event) => {
    let body = document.body; // Pega diretamente o elemento <body>
    let width = window.innerWidth;
    let height = window.innerHeight;
    let mouseX = event.clientX;
    let mouseY = event.clientY;

    const red = Math.round((mouseX / width) * 255);
    const green = Math.round((mouseY / height) * 255);
    const blue = 255 - red;

    body.style.color = `rgb(${red}, ${green}, ${blue})`; // Aplica a cor dinamicamente
});


