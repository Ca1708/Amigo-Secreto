// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

let listaDeAmigos = [];

// Cargar datos guardados al inicio
document.addEventListener("DOMContentLoaded", () => {
    const datosGuardados = localStorage.getItem("amigos");
    if (datosGuardados) {
        listaDeAmigos = JSON.parse(datosGuardados);
        mostrarLista();
    }
});

// Agregar un amigo a la lista y guardarlo
function agregarAmigo() {
    let input = document.getElementById('amigo');
    let nombre = input.value.trim();

    if (nombre === "") {
        alert("Por favor, ingresa un nombre válido.");
        return;
    }
    
    if (listaDeAmigos.includes(nombre)) {
        alert("Este nombre ya está en la lista.");
        return;
    }

    listaDeAmigos.push(nombre);
    localStorage.setItem("amigos", JSON.stringify(listaDeAmigos)); // Guardar en LocalStorage
    input.value = ""; 
    mostrarLista();
}

// Mostrar la lista de amigos en pantalla
function mostrarLista() {
    let listaHTML = document.getElementById('listaAmigos');
    listaHTML.innerHTML = "";

    listaDeAmigos.forEach((amigo, index) => {
        let item = document.createElement("li");
        item.textContent = amigo;

        // Botón para eliminar un nombre
        let botonEliminar = document.createElement("button");
        botonEliminar.textContent = "❌";
        botonEliminar.onclick = () => eliminarAmigo(index);
        item.appendChild(botonEliminar);

        listaHTML.appendChild(item);
    });
}

// Eliminar un amigo de la lista y actualizar LocalStorage
function eliminarAmigo(index) {
    listaDeAmigos.splice(index, 1);
    localStorage.setItem("amigos", JSON.stringify(listaDeAmigos));
    mostrarLista();
}

// Realizar el sorteo asegurando que nadie se asigne a sí mismo
function sortearAmigo() {
    if (listaDeAmigos.length < 2) {
        alert("Debe haber al menos 2 participantes para sortear.");
        return;
    }

    let asignaciones = {};
    let disponibles = [...listaDeAmigos];
    let intentos = 0;

    while (intentos < 100) { // Intentar hasta 100 veces para evitar bloqueos
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

// Mostrar el amigo secreto de la primera persona en la lista automáticamente
function mostrarResultadoIndividual() {
    let resultado = JSON.parse(localStorage.getItem("resultadoSorteo"));
    if (!resultado) {
        alert("No hay un sorteo realizado aún.");
        return;
    }

    let nombreUsuario = listaDeAmigos[0]; // Mostrar el primer usuario en la lista automáticamente
    let amigoSecreto = resultado[nombreUsuario];
    
    let resultadoHTML = document.getElementById('resultado');
    resultadoHTML.innerHTML = "";
    
    let item = document.createElement("li");
    item.textContent = `Tu amigo secreto es: ${amigoSecreto}`;
    resultadoHTML.appendChild(item);
}
