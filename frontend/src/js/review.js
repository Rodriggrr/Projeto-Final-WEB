

function put_stars(container, value = 0) { 
    value = (value < 0) ? 0 : value;
    value = (value > 5) ? 5 : value;
    let aux = (!isNaN(value)) ? value : 0;  
    container.innerHTML = '';
    while (value > 0) {
        if (value < 0.8) {
            container.innerHTML += `<i class="bi bi-star-half"></i>`;
        } else {
            container.innerHTML += `<i class="bi bi-star-fill"></i>`;
        }
        value--;
    }
    for (let i = 0; i < (5 - Math.ceil(aux)); i++){
        container.innerHTML += `<i class="bi bi-star"></i>`;
    }
}

function stars_init(containers, valores) {
    for (let i = 0; i < containers.length; i++) {
        put_stars(containers[i], parseFloat(valores[i].textContent));
    }
};