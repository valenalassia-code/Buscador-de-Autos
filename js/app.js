const resultado = document.querySelector('#resultado');

const marca = document.querySelector('#marca');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');
const combustible = document.querySelector("#combustible");

const year = document.querySelector('#year');
const max = new Date().getFullYear();
const min = max - 10;

const buscador= document.querySelector('#buscador');

const autoObj = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
    combustible:''

}

document.addEventListener('DOMContentLoaded', () => {

    mostrarAutos(autos);
    selectYear();
});

//Event listeners para los select de busqueda


addChangeEvent(marca, "marca", autoObj);
addChangeEvent(year, "year", autoObj);
addChangeEvent(minimo, "minimo", autoObj);
addChangeEvent(maximo, "maximo", autoObj);
addChangeEvent(puertas, "puertas", autoObj);
addChangeEvent(transmision, "transmision", autoObj);
addChangeEvent(color, "color", autoObj);
addChangeEvent(combustible, "combustible", autoObj);


function addChangeEvent(element, prop, obj){
    element.addEventListener("change", e =>{
        obj[prop] = e.target.value;
        filtrarAuto();
    });
}
function mostrarAutos(autos) {
    limpiarHTML();

    autos.forEach(auto => {

        const { marca, modelo, year, puertas, transmision, precio, color, combustible } = auto;
        const autoHTML = document.createElement('P');
        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: $${precio} - Color: ${color} - Combustible: ${combustible}
        
        `;
        resultado.appendChild(autoHTML);
    });

    
}
function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}
function selectYear() {

    for (let i = max; i >= min; i--) {
        const option = document.createElement('OPTION');
        option.value = i;
        option.textContent = i;
        year.appendChild(option)
    }

}
function filtrarAuto() {
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor).filter(filtrarCombustible);
    
    if(resultado.length){
        mostrarAutos(resultado);
    }else{
        noResultado();
    }
}
function noResultado(){
    limpiarHTML();
    const noResultado= document.createElement('DIV');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = "No hay Resultados, Intenta con otros términos de búsqueda";

    resultado.appendChild(noResultado);
}
function filtrarMarca(auto) {
    const { marca } = autoObj;

    if (marca) {
        return auto.marca === marca;
    }
    return auto;
}
function filtrarYear(auto) {
    const { year } = autoObj;
    if (year) {
        return auto.year === Number(year);
    }
    return auto;
}
function filtrarMinimo(auto) {
    const { minimo } = autoObj;
    if (minimo) {
        return auto.precio >= minimo;
    }
    return auto;
}
function filtrarMaximo(auto) {
    const { maximo } = autoObj;

    if (maximo) {
        return auto.precio <= maximo;
    }
    return auto;
}
function filtrarPuertas(auto) {
    const { puertas } = autoObj;

    if (puertas) {
        return auto.puertas === Number(puertas);
    }
    return auto;
}
function filtrarTransmision(auto) {
    const { transmision } = autoObj;

    if (transmision) {
        return auto.transmision === transmision;
    }
    return auto;
}
function filtrarColor(auto) {
    const { color } = autoObj;

    if (color) {
        return auto.color === color;
    }
    return auto;
}
function filtrarCombustible(auto) {
    const { combustible } = autoObj;
     if (combustible) {
         return auto.combustible === combustible || combustible === '';
    }
    return auto;
}