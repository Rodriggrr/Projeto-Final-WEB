let avaliacao_container = document.getElementsByClassName('stars');
let valores = document.getElementsByClassName('valor');

function put_stars(container, value) {

    value = (value < 0) ? 0 : value;
    value = (value > 5) ? 5 : value;
    let aux = (!isNaN(value)) ? value : 0;
    let text = container.innerHTML;
    container.innerHTML = ''; 
    while (value > 0) {
        if (value < 0.8) {
            container.innerHTML += `<i class="bi bi-star-half"></i>`; 
        } else {
            container.innerHTML += `<i class="bi bi-star-fill"></i>`; 
        }
        value--; 
    }
    for(let i = 0; i < (5 - Math.ceil(aux)); i++)
        container.innerHTML += `<i class="bi bi-star"></i>`; 
    container.innerHTML += `${text}`;
}

document.addEventListener("ReviewSTARS", () => {
    for (let i = 0; i < avaliacao_container.length; i++) {
        const valor = parseFloat(valores[i].textContent);
        console.log(`Valor para o container ${i}:`, valor);
        put_stars(avaliacao_container[i], valor);
    }
})

const evento = new Event("ReviewSTARS");
document.dispatchEvent(evento);

