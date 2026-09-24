// Para acceder a los elementos del HTML ya no usamos document.getElementById —
// usamos document.querySelector, que acepta cualquier selector CSS (#id, .clase,
// etiqueta...) y no solo ids. Por ejemplo: document.querySelector("#filtro-nombre").


//Ejercicio 1
async function obtenerPersonajes() {

  const respuesta = await fetch("https://rickandmortyapi.com/api/character");
  const datos = await respuesta.json();
  return datos.results;

  // TODO: pide "https://rickandmortyapi.com/api/character" con fetch, conviértela
  // a JSON y devuelve el array de personajes (repasa el ejercicio 1 de la práctica).
}

//Ejercicio 2
function filtrarPorEstado(personajes, estado) {

    if (!estado) {
        return personajes;
    }

    return personajes.filter(function (personaje) {
    return personaje.status === estado;
  });

  // TODO: si estado viene vacío, devuelve personajes tal cual. Si no, filtra
  // dejando solo los que coinciden (repasa el ejercicio 2 de la práctica).
}

//Ejercicio 3
function filtrarPorEspecie(personajes, especie) {

    if (!especie) {
        return personajes;
    }

    return personajes.filter(function (personaje) {
    return personaje.species === especie;
  });

  // TODO: si especie viene vacía, devuelve personajes tal cual. Si no, filtra
  // dejando solo los que coinciden (repasa el ejercicio 3 de la práctica).
}

//Ejercicio 4
function obtenerNombres(personajes) {
  return personajes.map(function (personaje) {
    return personaje.name;
  });
}

//Ejercicio 5
function buscarPorNombre(personajes, nombre) {
  return personajes.find(function (personaje) {
    return personaje.name === nombre;
  });
}

//Ejercicio 6
function hayPersonajesMuertos(personajes) {
  return personajes.some(function (personaje) {
    return personaje.status === "Dead";
  });
}

//Ejercicio 7
function todosVivos(personajes) {
  return personajes.every(function (personaje) {
    return personaje.status === "Alive";
  });
}

//Ejercicio 8
function ordenarPorNombre(personajes) {
  return [...personajes].sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });
}

//Ejercicio 9
function primeros(personajes, cantidad) {
  return personajes.slice(0, cantidad);
}

//Ejercicio 10
function posicionDeNombre(nombres, nombre) {
  return nombres.indexOf(nombre);
}

//Ejercicio 11
function contarVivos(personajes) {
  return personajes.reduce(function (total, personaje) {
    return personaje.status === "Alive" ? total + 1 : total;
  }, 0);
}

let personajes = [];

let ordenadoAZ = false;

function aplicarFiltros() {
  const nombre = document.querySelector("#filtro-nombre").value.trim().toLowerCase();
  const estado = document.querySelector("#filtro-estado").value;
  const especie = document.querySelector("#filtro-especie").value;

  //verifica si la casilla está marcada
  const primeros10 = document.querySelector("#check-primeros").checked;

  let filtrados = filtrarPorEstado(personajes, estado);
  filtrados = filtrarPorEspecie(filtrados, especie);
  filtrados = filtrados.filter(function (personaje) {
    return personaje.name.toLowerCase().includes(nombre);
  });

  //aplicamos la funcionalidad para ordenar
  if (ordenadoAZ){
    filtrados = ordenarPorNombre(filtrados);
  }

  //aplicamos la funcionalidad de mostrar solo los primeros 10
  if (primeros10){
    filtrados = primeros(filtrados, 10);
  }

  pintarResultados(filtrados);
  //funcion para los textos y el badge
  actualizarEstadisticas(filtrados);
}

function pintarResultados(lista) {
  const contenedor = document.querySelector("#resultados");
  document.querySelector("#contador").textContent = lista.length + " personajes encontrados";

  contenedor.innerHTML = lista
    .map(function (personaje) {
      return (
        '<article class="personaje-card">' +
        '<img src="' + personaje.image + '" alt="' + personaje.name + '" />' +
        "<h3>" + personaje.name + "</h3>" +
        "<p>" + personaje.status + " · " + personaje.species + "</p>" +
        "</article>"
      );
    })
    .join("");
}

document.querySelector("#filtro-nombre").addEventListener("input", aplicarFiltros);
document.querySelector("#filtro-estado").addEventListener("change", aplicarFiltros);
document.querySelector("#filtro-especie").addEventListener("change", aplicarFiltros);

obtenerPersonajes().then(function (datos) {
  personajes = datos;
  aplicarFiltros();
});
