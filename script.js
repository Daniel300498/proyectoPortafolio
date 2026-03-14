
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
            const fecha = new Date(proyecto.updated_at);
            contenedorProyectos.innerHTML += `
                <div class="proyecto-card">
                    <h3>${proyecto.name}</h3>  
                    <p>${proyecto.description || "Sin descripción"}</p>
                    <p style="display:none" class= "fecha">${fecha.toLocaleDateString()}</p>
                    <a href="${proyecto.html_url}" target="_blank">Ver en GitHub</a>
                </div>
                    `;
        });
    } catch (error) {
        console.error("Error:", error);
    }
}
cargarProyectos();

const UI = {
    cuerpo: document.body,
    contenedor: document.getElementById("contenedor-proyectos"),
    btnTema: document.getElementById("btn-tema"),
    btnProyectos : document.getElementById("ver-proyectos"),
    h2: document.querySelectorAll("h2"),
    contacto: document.getElementById("contacto"),
    /*  
  #contacto{
        background-color: #555555;
        color: #e0e0e0;
    }

    #contacto a{
        background-color: #90caf9;
        color: black;
    }
*/
     modoOscuro:false,
    alternarColor: function() {
       //const modoOscuro = this.cuerpo.style.backgroundColor === "black";
        this.modoOscuro = !this.modoOscuro; 
        this.cuerpo.style.backgroundColor = this.modoOscuro ? "#e0e0e0" : "#1e1e1e";
        this.cuerpo.style.color = this.modoOscuro ? "#1e1e1e" : "#e0e0e0";
        this.btnProyectos.style.backgroundColor = this.modoOscuro ? "#90caf9" : "#555555";
        this.btnProyectos.style.color = this.modoOscuro ? "#1e1e1e" : "#e0e0e0";         
        this.btnTema.style.backgroundColor = this.modoOscuro ? "#1e1e1e" : "#e0e0e0";
        this.btnTema.style.color = this.modoOscuro ? "#e0e0e0" : "#1e1e1e"; 
        this.contacto.style.backgroundColor = this.modoOscuro ? "#e0e0e0" : "#555555";
        //contenedor
        this.contenedor.style.backgroundColor = this.modoOscuro ? "#90caf9" : "#555555";
        this.h2.forEach((titulo) => {
            titulo.style.color = this.modoOscuro ? "#1e1e1e" : "#90caf9";
        });  
        document.querySelectorAll(".proyecto-card").forEach(card => {
            card.style.backgroundColor = this.modoOscuro ? "#ffffff" : "#1e1e1e";
            card.style.color = this.modoOscuro ? "#1e1e1e" : "#e0e0e0";
        });

        document.querySelectorAll(".experiencia-card").forEach(card => {
            card.style.backgroundColor = this.modoOscuro ? "#ffffff" : "#555555";
            card.style.color = this.modoOscuro ? "#1e1e1e" : "#e0e0e0";
        });
        if(this.modoOscuro){
            this.btnTema.textContent="Modo Oscuro";
        }else{
            this.btnTema.textContent="Modo Claro";
        }
     
    },
    irAseccion: function(id) {
        document.getElementById(id).scrollIntoView({ behavior: "smooth" }); 
    }};

botonTema.addEventListener("click", () => UI.alternarColor());

// poner boton segun el contexto
const temaSistema = window.matchMedia("(prefers-color-scheme:dark)");
function actualizarTextBoton(){
    if(temaSistema.matches){
        UI.btnTema.textContent = "Modo Claro";
        UI.modoOscuro= false;
    }else {
        UI.btnTema.textContent = "Modo Oscuro";
        UI.modoOscuro = true;
    }
}
//
 const btnVerMas= document.getElementById("ver-mas");
 const biografiaExtra = document.getElementById("biografia-extra");
 btnVerMas.addEventListener("click", ()=>{
    if(biografiaExtra.style.display === "none"){
        biografiaExtra.style.display= "inline";
        btnVerMas.textContent= "Ver menos";
    }else{
        biografiaExtra.style.display = "none";
        btnVerMas.textContent= "Ver mas";
    }
 });

actualizarTextBoton();
temaSistema.addEventListener("change", actualizarTextBoton);
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
        alert ("PROYECTO: " + tarjeta.querySelector("h3").innerText + " - ULTIMA ACTUALIZACION: " + tarjeta.querySelector(".fecha").innerText);
    }
});

const boton = document.getElementById("ver-proyectos");
const boton2=document.getElementById("btn-tema");
const botonContacto=document.getElementById("btn-contacto");
boton.addEventListener("mouseover", function(){
    boton.style.filter = "brightness(40%)"; 
});
boton2.addEventListener("mouseover", function(){
    boton2.style.filter = "brightness(40%)";
});
botonContacto.addEventListener("mouseover", function(){
    botonContacto.style.filter = "brightness(40%)";
});
botonContacto.addEventListener("mouseout", function(){
    botonContacto.style.filter = "brightness(100%)";
});
boton.addEventListener("mouseout", function(){
    boton.style.filter = "brightness(100%)";
});
boton2.addEventListener("mouseout", function(){
    boton2.style.filter = "brightness(100%)";
});

const carrusel = document.getElementById("carrusel-exp");

document.getElementById("btn-der").addEventListener("click", () => {
    carrusel.scrollBy({
        left: carrusel.clientWidth,
        behavior: "smooth"
    });
});

document.getElementById("btn-izq").addEventListener("click", () => {
    carrusel.scrollBy({
        left: -carrusel.clientWidth,
        behavior: "smooth"
    });
});