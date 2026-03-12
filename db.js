let db;
const request = indexedDB.open('TareasDB', 1);

//Verification DB
request.onupgradeneeded = (event) => {
    db = event.target.result;
    if (!db.objectStoreNames.contains('pendientes')) {
        db.createObjectStore('pendientes',{keyPath: 'id', autoIncrement: true});
    }
}

request.onsuccess = (event) => {
    db = event.target.result;
    console.log('IndexDB ready');
    mostrarTareas(); //Show Tasks
}

function insertarTareaDB(titulo) {

    if(!db){
        console.error("DB aún no está lista");
        return;
    }

    const transaction = db.transaction(['pendientes'], 'readwrite');
    const store = transaction.objectStore('pendientes');

    const nuevoTarea = {
        titulo: titulo,
        fecha: new Date().toLocaleDateString()
    };

    const query = store.add(nuevoTarea);

    query.onsuccess = () => {
        console.log('Task saved in DB');
        mostrarTareas();
    }
}

function mostrarTareas() {
    const listaUl = document.getElementById('task-list');
    listaUl.innerHTML = ''; //Clean html

    const transaction = db.transaction(['pendientes'], 'readonly');
    const store = transaction.objectStore('pendientes');
    const cursorRequest = store.openCursor();

    cursorRequest.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            const li = document.createElement('li');
            li.innerHTML = `
                <span> ${cursor.value.titulo} </span>
                <small> ${cursor.value.fecha} </small>
            `;
            listaUl.appendChild(li);
            cursor.continue();
        } 


    }
}