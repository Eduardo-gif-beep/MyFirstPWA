//service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('Service Worker Registered', reg))
            .catch(err => console.warn('Error in SW register', err))
    });
}

const status = document.getElementById("status");
const input = document.getElementById("product-input");
const form = document.getElementById("product-form");
const quantity = document.getElementById("product-quantity");

//Handle send form 
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const texto = input.value.trim();
    const quantity1 = quantity.value;

    if (texto !== "" && quantity1 !== "") {
        insertarProductoDB(texto, quantity1);
        input.value = "";
        quantity.value = "";
        input.focus();
    }
});

window.addEventListener('online', () => {
    status.textContent = "online";
    status.className = "online";
});

window.addEventListener('offline', () => {
    status.textContent = "offline";
    status.className = "offline";
});
// //CSR
// const taskList = document.getElementById("task-list");

// //Array CSE

// const tareasLocales = [
//     "Tarea desde JS: Configurar entorno",
//     "Tarea desde JS: Probar Live Server",
//     "Tarea desde JS: Configurar Analizar el DOM",
// ];

// function renderLocalTask() {
//     taskList.innerHTML = "";
//     tareasLocales.forEach((tarea) => {
//         const li = document.createElement("li");
//         li.textContent = tarea;
//         taskList.appendChild(li);
//     });
// }

// //renderLocalTask();

// async function fetchRemoteTask() {
//     const container = document.getElementById("app-content");

//     //Mostrar estado de carga
//     container.innerHTML =
//         '<p class="loading"> Cargando datos de la API externa ... </p> ';

//     try {
//         const response = await fetch(
//             "https://jsonplaceholder.typicode.com/posts?_limit=5"
//         );
//         const posts = await response.json();

//         //Limpiar contenedor y nueva lista
//         container.innerHTML = '<ul id="task-list"> </ul>';
//         const newList = document.getElementById("task-list");

//         //Renderizar
//         posts.forEach((post) => {
//             const li = document.createElement("li");
//             li.innerHTML = `<strong>${post.title}</strong><br><small>${post.body}</small>`;
//             newList.appendChild(li);
//         });
//     } catch (error) {
//         container.innerHTML =
//             '<p styles="color:red"> Error al cargar los datos</p> ';
//         console.error("Error en el fetch: ", error);
//     }
// }
// window.addEventListener("load", fetchRemoteTask);
