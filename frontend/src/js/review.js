

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

function stars_hover(container, valueContainer) {
    console.log('teste');
    let stars = container.getElementsByClassName('bi');
    console.log(stars);
    let value = valueContainer.innerHTML;
    for (let i = 0; i < stars.length; i++) {
        stars[i].addEventListener('mouseover', () => {
            value = i + 1;
            console.log(value); 
            put_stars(container, value);
        });
    }
    container.addEventListener('mouseout', () => {
        put_stars(container, valueContainer.innerHTML);
    });
    container.addEventListener('click', () => {
        valueContainer.innerHTML = value;
        put_stars(container, value);
    });
}