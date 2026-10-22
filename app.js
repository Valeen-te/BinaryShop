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
const caja_login = document.getElementById('caja_login');
const caja_registro = document.getElementById('caja_registro');
const link_registro = document.getElementById('link_registro');
const link_login = document.getElementById('link_login');
const btn_registrar = document.getElementById('btn_registrar');
const caja_link_registro = document.getElementById('caja_link_registro');
const pantalla_pago = document.getElementById('pantalla_pago');
const btn_confirmar_pago = document.getElementById('btn_confirmar_pago');
const btn_cancelar_pago = document.getElementById('btn_cancelar_pago');
const lista_historial_ventas = document.getElementById('lista_historial_ventas');

const usuarios = [ 
    { id: 1, nickname: 'admin', pass: 'admin123', rol: 'admin' },
    { id: 2, nickname: 'juan123', pass: '1234', rol: 'comprador' }, 
    { id: 3, nickname: 'maria_vende', pass: '1234', rol: 'vendedor' } 
];

const productos = [
    {id: 1, nombre: 'Memoria RAM 16GB', precio: 120, img: 'img/img1.jpg' }, 
    {id: 2, nombre: 'SSD 1TB', precio: 150, img: 'img/img2.jpg' }, 
    {id: 3, nombre: 'Intel core i7 11th Gen', precio: 370, img: 'img/img3.jpg' }
];

const historialVentas = [
    { id: 1, nombre: 'Memoria RAM 16GB', precio: 120 },
    { id: 2, nombre: 'SSD 1TB', precio: 150 }
];

const carrito = [];

btn_login.addEventListener('click', function(evento) {
    evento.preventDefault();
    const nickname = document.getElementById('login_nickname').value;
    const password = document.getElementById('login_password').value;

    const usuarioEncontrado = usuarios.find(user => user.nickname === nickname && user.pass === password);

    if (usuarioEncontrado) {
        caja_login.style.display = 'none';
        caja_registro.style.display = 'none';
        caja_link_registro.style.display = 'none';

        if (usuarioEncontrado.rol === 'admin') {
            pantalla_admin.style.display = 'flex';
            cargarPanelAdmin();
        } else if (usuarioEncontrado.rol === 'comprador') {
            pantalla_catalogo.style.display = 'block';
        } else if (usuarioEncontrado.rol === 'vendedor') {
        pantalla_vendedor.style.display = 'flex';
        cargarHistorialVentas();
    }
    } else {
        alert("Credenciales incorrectas. Verifica tu nickname y contraseña.");
    }
});

btn_registrar.addEventListener('click', function(evento) {
    evento.preventDefault();
    
    const nickname = document.getElementById('reg_nickname').value;
    const password = document.getElementById('reg_password').value;
    const rolSeleccionado = document.querySelector('input[name="reg_rol"]:checked').value;

    if(nickname === '' || password === '') {
        alert("El Nickname y la Contraseña son obligatorios.");
        return; 
    }

    const nuevoUsuario = {
        id: usuarios.length + 1,
        nickname: nickname,
        pass: password,
        rol: rolSeleccionado
    };

    usuarios.push(nuevoUsuario);
    
    alert("Cuenta creada con éxito. Ya puedes iniciar sesión.");
    
    caja_registro.style.display = 'none';
    caja_login.style.display = 'block';
    
    document.getElementById('reg_nickname').value = '';
    document.getElementById('reg_password').value = '';
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

link_registro.addEventListener('click', function() {
    caja_login.style.display = 'none';
    caja_registro.style.display = 'block';
    caja_link_registro.style.display = 'none';
});

link_login.addEventListener('click', function() {
    caja_registro.style.display = 'none';
    caja_login.style.display = 'block';
    caja_link_registro.style.display = 'block';
});

btn_confirmar_pago.addEventListener('click', function(evento) {
    evento.preventDefault();
    alert("Pago exitoso. Gracias por tu compra en BinaryShop.");
    
    carrito.length = 0;
    actualizarContadorCarrito();
    
    pantalla_pago.style.display = 'none';
    pantalla_catalogo.style.display = 'block';
});

btn_cancelar_pago.addEventListener('click', function(evento) {
    evento.preventDefault();
    pantalla_pago.style.display = 'none';
    pantalla_catalogo.style.display = 'block';
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
    carrito_desplegable.innerHTML = '<h3>Tu Carrito</h3><hr>';
    let total = 0;

    for (let i = 0; i < carrito.length; i++) {
        const producto = carrito[i];
        carrito_desplegable.innerHTML += `
            <div class="producto_carrito">
                <h4>${producto.nombre}</h4>
                <p>Precio: $${producto.precio}</p>
                <hr>
            </div>
        `;
        total += producto.precio;
    }
    
    carrito_desplegable.innerHTML += `<p id="precio_total">Total: $${total}</p>`;
    
    if (carrito.length > 0) {
        carrito_desplegable.innerHTML += `<button id="btn_pagar_carrito" onclick="abrirPago()">Pagar</button>`;
    }
}

function comprarAhora(idProducto) {
    const producto_elegido = productos.find(producto => producto.id === idProducto);
    
    carrito.length = 0; 
    
    carrito.push(producto_elegido);
    actualizarContadorCarrito();
    
    abrirPago();
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

function abrirPago() {
    carrito_desplegable.style.display = 'none';
    pantalla_catalogo.style.display = 'none';
    pantalla_pago.style.display = 'block';
}

function cargarHistorialVentas() {
    if (historialVentas.length === 0) {
        lista_historial_ventas.innerHTML = '<p>Aún no hay ventas registradas.</p>';
        return;
    }

    lista_historial_ventas.innerHTML = '';
    let totalAcumulado = 0;

    for (let i = 0; i < historialVentas.length; i++) {
        const venta = historialVentas[i];
        lista_historial_ventas.innerHTML += `
            <div class="venta_item">
                <span>🟢 ${venta.nombre}</span>
                <span>$${venta.precio}</span>
            </div>
        `;
        totalAcumulado += venta.precio;
    }
    
    lista_historial_ventas.innerHTML += `<h4 class="total_ventas">Total acumulado: $${totalAcumulado}</h4>`;
}

cargarCatalogo();