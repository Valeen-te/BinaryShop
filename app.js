const pantalla_login = document.getElementById('pantalla_login');
const pantalla_catalogo = document.getElementById('pantalla_catalogo');
const pantalla_vendedor = document.getElementById('pantalla_vendedor');
const pantalla_admin = document.getElementById('pantalla_admin');
const carrito_desplegable = document.getElementById('carrito_desplegable');
const btn_login = document.getElementById('btn_login');
const btn_carrito = document.getElementById('btn_carrito');
const contenedor_Catalogo = document.getElementById('catalogo');
const contador_carrito = document.getElementById('contador_carrito');
const btn_publicar = document.getElementById('btn_publicar');
const lista_usuarios = document.getElementById('lista_usuarios');
const lista_productos = document.getElementById('lista_productos');

const usuarios = [ 
    { id: 1, nickname: 'juan123', rol: 'comprador' }, 
    { id: 2, nickname: 'maria_vende', rol: 'vendedor' } ];

const productos = [
    {id: 1, nombre: 'Memoria RAM 16GB', precio: 120, img: 'img/img1.jpg' }, 
    {id: 2, nombre: 'SSD 1TB', precio: 150, img: 'img/img2.jpg' }, 
    {id: 3, nombre: 'Intel core i7 11th Gen', precio: 370, img: 'img/img3.jpg' }];

const carrito = [];

btn_login.addEventListener('click', function(evento) {
    evento.preventDefault();
    const nickname = document.getElementById('input_nickname').value;
    const rolseleccionado = document.querySelector('input[name="rol"]:checked').value;
    pantalla_login.style.display = 'none';
    pantalla_catalogo.style.display = 'none';
    pantalla_vendedor.style.display = 'none';
    pantalla_admin.style.display = 'none';
    btn_carrito.style.visibility = 'visible';

    if(nickname === 'admin') {
        pantalla_admin.style.display = 'flex';
        cargarPanelAdmin();
    }else if(rolseleccionado === 'comprador') {
        pantalla_catalogo.style.display = 'block';
    }else if(rolseleccionado === 'vendedor') {
        pantalla_vendedor.style.display = 'block';
    }
});

btn_publicar.addEventListener('click', function(event) {
    event.preventDefault();
    const nombreArticulo = document.getElementById('input_nombre_articulo').value;
    const precioArticulo = parseFloat(document.getElementById('input_precio').value);
    const nuevoProducto = {
        id: productos.length + 1,
        nombre: nombreArticulo,
        precio: precioArticulo,
        img: 'img/default.jpg'
    };
    productos.push(nuevoProducto);
    cargarCatalogo();
    pantalla_vendedor.style.display = 'none';
    pantalla_catalogo.style.display = 'block';
});

btn_carrito.addEventListener('click', function() {
    if (carrito_desplegable.style.display === 'none' || carrito_desplegable.style.display === '') {
        carrito_desplegable.style.display = 'block';
    } else {
        carrito_desplegable.style.display = 'none';
    }
});

function cargarCatalogo(){
    contenedor_Catalogo.innerHTML = '';
    for(let i = 0; i < productos.length; i++){
        const producto = productos[i];
        contenedor_Catalogo.innerHTML += `
            <div class="producto">
                <img src="${producto.img}" width="100">
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
                <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
                <button onclick="comprarAhora(${producto.id})">Comprar de inmediato</button>
            </div>
        `;
    }
}

function agregarAlCarrito(idProducto) {
    const producto_elegido  = productos.find(producto => producto.id === idProducto);
    carrito.push(producto_elegido);
    actualizarContadorCarrito();
}

function actualizarContadorCarrito() {
    contador_carrito.innerText = carrito.length;
    carrito_desplegable.innerHTML = '<h3>Tu Carrito</h3>';
    let total = 0;

    for (let i = 0; i < carrito.length; i++) {
        const producto = carrito[i];
        carrito_desplegable.innerHTML += `
            <div class="producto_carrito">
                <h4>${producto.nombre}</h4>
                <p>Precio: $${producto.precio}</p>
            </div>
        `;
        total += carrito[i].precio;
    }
    carrito_desplegable.innerHTML += `<p>Total: $${total}</p>`;
}

function comprarAhora(idProducto) {
    console.log("Comprando de inmediato el producto:", idProducto);
}

function eliminarUsuario(idUsuario) {
    const index = usuarios.findIndex(usuario => usuario.id === idUsuario);  
    if (index !== -1) {
        usuarios.splice(index, 1);
        cargarPanelAdmin();
    }
}

function eliminarProducto(idProducto) {
    const index = productos.findIndex(producto => producto.id === idProducto);
    if (index !== -1) {
        productos.splice(index, 1);
        cargarPanelAdmin();
        cargarCatalogo();
    }
}

function cargarPanelAdmin() {
    lista_usuarios.innerHTML = '<h3>Usuarios</h3>';
    lista_productos.innerHTML = '<h3>Productos</h3>';

    for (let i = 0; i < usuarios.length; i++) {
        const usuario = usuarios[i];
        lista_usuarios.innerHTML +=
        `<p>
            <span>Usuario: ${usuario.nickname} <br> Rol: ${usuario.rol}</span> 
            <button onclick="eliminarUsuario(${usuario.id})">Eliminar</button>
        </p>`;
    }
    
    for (let i = 0; i < productos.length; i++) {
        const producto = productos[i];
        lista_productos.innerHTML +=
        `<p>
            <span>Producto: ${producto.nombre} <br> Precio: $${producto.precio}</span> 
            <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
        </p>`;
    }
}

cargarCatalogo();