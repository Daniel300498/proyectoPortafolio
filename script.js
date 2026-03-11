
const botonProyectos = document.getElementById("ver-proyectos");
function mostrarProyectos() {
    const proyectosSection = document.getElementById("proyectos");
    proyectosSection.scrollIntoView({ behavior: "smooth" });
}
botonProyectos.addEventListener("click", mostrarProyectos);
 
//cambiarTema
const botonTema = document.getElementById("btn-tema");
 
// entender la visibilidad de las variables y la memoria de las funciones
function crearContadorDeProyectos(inicial) {
    let contador = inicial; //variable privada gracias al closure
 
    return{
        incrementar: function() {
            contador++;
            return `Ahora tienes ${contador} proyectos.`;
        },
        obtenerTotal: () => contador //funcion flecha para obtener el valor actual del contador
    };
}  
 
const miContador = crearContadorDeProyectos(4);
console.log(miContador.incrementar()); // Ahora tienes 5 proyectos.
console.log(miContador.contador); // undefined, no se puede acceder directamente al contador
 
 
// otro ejemplo
function crearRastreador(){
    //local/function scope: solo vive aqui dentro de la funcion
    let conteo = 0; //variable privada, no accesible desde fuera
    return function() { //closure que mantiene acceso a conteo
        conteo++;
        return ` has intentado ver los proyectos ${conteo}`;
    };
}
 
const rastrearclick = crearRastreador();
console.log(rastrearclick()); // has intentado ver los proyectos 1
console.log(rastrearclick()); 

async function cargarProyectos() {
    try {
        const response = await fetch("https://api.github.com/users/daniel300498/repos");
        if (!response.ok) {
            throw new Error("Error al cargar los proyectos");
        }
        const proyectos = await response.json();
        const contenedorProyectos = document.getElementById("contenedor-proyectos");
        contenedorProyectos.innerHTML = ""; //limpiar el contenedor antes de agregar nuevos proyectos
        proyectos.forEach(proyecto => {
            contenedorProyectos.innerHTML += `
                <div class="proyecto-card">
                    <h3>${proyecto.name}</h3>  
                    <p>${proyecto.occupattion || "Sin descripción"}</p>
                    <a href="${proyecto.html_url}" target="_blank">Ver en GitHub</a>
                </div>
                    `;
        });
    } catch (error) {
        console.error("Error:", error);
    }
}
cargarProyectos();

/// modularidad controlador de interfaz
const UI = {
    cuerpo: document.body,
    contenedor: document.getElementById("contenedor-proyectos"),
    btnTema: document.getElementById("btn-tema"),
    btnProyectos : document.getElementById("ver-proyectos"),
    alternarColor: function() {
        const esOscuro = this.cuerpo.style.backgroundColor === "black";
        this.cuerpo.style.backgroundColor = esOscuro ? "white" : "black";
        this.cuerpo.style.color = esOscuro ? "black" : "white";
        this.btnProyectos.style.backgroundColor = esOscuro ? "lightblue" : "gray";
        this.btnProyectos.style.color = esOscuro ? "black" : "white";          // CONTENEDOR
        this.contenedor.style.backgroundColor = esOscuro ? "lightblue" : "gray";
       if(esOscuro){
            this.btnTema.textContent="Modo Oscuro";
            this.btnTema.classList.remove("claro");
            this.btnTema.classList.add("oscuro");
        }else{
            this.btnTema.textContent="Modo Claro";
            this.btnTema.classList.remove("oscuro");
            this.btnTema.classList.add("claro");
        }
    },
    irAseccion: function(id) {
        document.getElementById(id).scrollIntoView({ behavior: "smooth" }); }
 
};
UI.btnTema.addEventListener("click", () => UI.alternarColor());
UI.btnProyectos.addEventListener("click",() => UI.irAseccion("proyectos"));

//contacto
const botonContacto = document.getElementById("btn-contacto");
const caja = document.getElementById("caja-contacto");
const cerrar = document.getElementById("cerrar");

botonContacto.addEventListener("click", function(e){
    e.preventDefault();
    caja.style.display = "block";
});

cerrar.addEventListener("click", function(){
    caja.style.display = "none";
});

//local storage para guardar preferencias del usuario
function guardartema(color){
    localStorage.setItem("temaPreferido",color);
}
const temaGuardado = localStorage.getItem("temaPreferido");
if(temaGuardado){
    cuerpoPagina.style.backgroundColor=temaGuardado;
    cuerpoPagina.style.color = temaGuardado === "black" ? "white":"black";
}

// delegacion  de  eventos: un solo listener para todo el contenedor de proyectos
const contenedor = document.getElementById("contenedor-proyectos");
contenedor.addEventListener("click", function(evento){
 // .target el elemento que fue clikeado .closest busca el padre mas cercano que coincida con el selector dado
    const tarjeta = evento.target.closest(".proyecto-card");
    if(tarjeta){
        alert ("Haz hecho clic en un proyecto: " + tarjeta.querySelector("h3").innerText);
    }
});