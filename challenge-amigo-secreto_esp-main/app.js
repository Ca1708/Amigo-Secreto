// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

let listaDeAmigos = [];

document.addEventListener("DOMContentLoaded", () => {
    localStorage.removeItem("amigos");
    localStorage.removeItem("resultadoSorteo");
    listaDeAmigos = [];
    mostrarLista();
});

function agregarAmigo() {
    let input = document.getElementById('amigo');
    let nombre = input.value.trim();

    if (nombre === "" || listaDeAmigos.includes(nombre)) {
        alert("Nombre inválido o duplicado.");
        return;
    }

    listaDeAmigos.push(nombre);
    localStorage.setItem("amigos", JSON.stringify(listaDeAmigos));
    input.value = "";
    mostrarLista();
}

function mostrarLista() {
    let listaHTML = document.getElementById('listaAmigos');
    listaHTML.innerHTML = "";

    listaDeAmigos.forEach((amigo, index) => {
        let item = document.createElement("li");
        item.textContent = amigo;
        let botonEliminar = document.createElement("button");
        botonEliminar.textContent = "❌";
        botonEliminar.onclick = () => eliminarAmigo(index);
        item.appendChild(botonEliminar);
        listaHTML.appendChild(item);
    });
}

function eliminarAmigo(index) {
    listaDeAmigos.splice(index, 1);
    localStorage.setItem("amigos", JSON.stringify(listaDeAmigos));
    mostrarLista();
}

function sortearAmigo() {
    if (listaDeAmigos.length < 2) {
        alert("Debe haber al menos 2 participantes para sortear.");
        return;
    }

    let asignaciones = {};
    let disponibles = [...listaDeAmigos];
    let intentos = 0;

    while (intentos < 100) {
        disponibles = [...listaDeAmigos];
        asignaciones = {};
        let fallo = false;

        for (let amigo of listaDeAmigos) {
            let opciones = disponibles.filter(a => a !== amigo);
            if (opciones.length === 0) {
                fallo = true;
                break;
            }
            let elegido = opciones[Math.floor(Math.random() * opciones.length)];
            asignaciones[amigo] = elegido;
            disponibles.splice(disponibles.indexOf(elegido), 1);
        }

        if (!fallo) {
            localStorage.setItem("resultadoSorteo", JSON.stringify(asignaciones));
            alert("El sorteo ha sido realizado. Ahora puedes ver tu amigo secreto.");
            mostrarResultadoIndividual();
            return;
        }
        intentos++;
    }

    alert("Error en el sorteo. Inténtalo nuevamente.");
}

function mostrarResultadoIndividual() {
    let resultado = JSON.parse(localStorage.getItem("resultadoSorteo"));
    if (!resultado) {
        alert("No hay un sorteo realizado aún.");
        return;
    }

    let nombreUsuario = listaDeAmigos[0];
    let amigoSecreto = resultado[nombreUsuario];
    
    let resultadoHTML = document.getElementById('resultado');
    resultadoHTML.innerHTML = "";
    
    let item = document.createElement("li");
    item.textContent = `Tu amigo secreto es: ${amigoSecreto}`;
    resultadoHTML.appendChild(item);
}
