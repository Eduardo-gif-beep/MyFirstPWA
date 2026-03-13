let db;
const request = indexedDB.open('InventarioDB', 1);

//Verification DB
request.onupgradeneeded = (event) => {
    db = event.target.result;
    if (!db.objectStoreNames.contains('productos')) {
        db.createObjectStore('productos',{keyPath: 'id', autoIncrement: true});
    }
}

request.onsuccess = (event) => {
    db = event.target.result;
    console.log('IndexDB ready');
    mostrarProductos(); //Show products
}

function insertarProductoDB(titulo, cantidad) {

    if(!db){
        console.error("DB aún no está lista");
        return;
    }

    const transaction = db.transaction(['productos'], 'readwrite');
    const store = transaction.objectStore('productos');

    const nuevoProducto = {
        titulo: titulo,
        cantidad: cantidad,
        fecha: new Date().toLocaleDateString()
    };

    const query = store.add(nuevoProducto);

    query.onsuccess = () => {
        console.log('Product saved in DB');
        mostrarProductos();
    }
}

function mostrarProductos() {
    const listaUl = document.getElementById('product-list');
    listaUl.innerHTML = ''; //Clean html

    const transaction = db.transaction(['productos'], 'readonly');
    const store = transaction.objectStore('productos');
    const cursorRequest = store.openCursor();

    cursorRequest.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>Product name: ${cursor.value.titulo}</span><br> 
                <small>Date: ${cursor.value.fecha}</small><br>
                <small>Quantity: ${cursor.value.cantidad}</small>
            `;
            listaUl.appendChild(li);
            cursor.continue();
        } 


    }
}