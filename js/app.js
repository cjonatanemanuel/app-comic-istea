// ===============================
// Lista de productos
// ===============================
const productos = [
  {
    id: 1,
    nombre: 'Spider-Man 2',
    imagen: 'img/foto1.jpg',
    descripcion: 'Peter Parker se enfrenta a nuevos desafíos en su vida personal y como Spider-Man, mientras un nuevo villano emerge en la ciudad.',
    precio: 2300
  },
  {
    id: 2,
    nombre: 'Amazing Spider-Man: Ultimate',
    imagen: 'img/foto2.jpg',
    descripcion: 'Un evento que sacude los cimientos del Universo Ultimate, forzando a Spider-Man a tomar decisiones impensables.',
    precio: 2400
  },
  {
    id: 3,
    nombre: 'The Amazing Spider-Man',
    imagen: 'img/foto3.jpg',
    descripcion: 'Enfrentándose a viejos y nuevos enemigos, Spider-Man debe superar sus límites para proteger a quienes ama.',
    precio: 2500
  },
  {
    id: 4,
    nombre: 'The Amazing Spider-Man',
    imagen: 'img/foto4.jpg',
    descripcion: 'Una aventura clásica donde el ingenio y la agilidad de Spider-Man son puestos a prueba contra un adversario implacable.',
    precio: 2600
  },
  {
    id: 5,
    nombre: 'Spider-Man 91',
    imagen: 'img/foto5.jpg',
    descripcion: 'Explora los primeros días de Peter Parker como el sorprendente Spider-Man, aprendiendo a balancear su vida de estudiante con la de superhéroe.',
    precio: 1850
  },
  {
    id: 6,
    nombre: 'Spider-Man: Galactus',
    imagen: 'img/foto6.jpg',
    descripcion: 'Un vistazo a un futuro donde Peter y Mary Jane Watson crían a su hija, mientras Spider-Man enfrenta amenazas familiares.',
    precio: 1950
  },
  {
    id: 7,
    nombre: 'The Amazing Spider-Man 92',
    imagen: 'img/foto7.jpg',
    descripcion: 'Sigue las aventuras de Miles Morales mientras asume el manto de Spider-Man en su propio camino heroico.',
    precio: 1750
  },
  {
    id: 8,
    nombre: 'The Amazing Spider-Man 81',
    imagen: 'img/foto8.jpg',
    descripcion: 'Sumérgete en el oscuro y complejo mundo de Eddie Brock y el simbionte Venom, explorando su retorcida relación.',
    precio: 2550
  },
  {
    id: 9,
    nombre: 'Spider-Man 77',
    imagen: 'img/foto9.jpg',
    descripcion: 'Únete a Star-Lord, Gamora, Drax, Rocket y Groot en sus caóticas y cósmicas misiones para salvar la galaxia.',
    precio: 2650
  },
  {
    id: 10,
    nombre: 'Avengers 28',
    imagen: 'img/foto10.jpg',
    descripcion: 'Tony Stark se enfrenta a desafíos tecnológicos y personales mientras continúa innovando como el Invencible Iron Man.',
    precio: 2320
  },
  {
    id: 11,
    nombre: 'Avengers: Captain America',
    imagen: 'img/foto11.jpg',
    descripcion: 'Steve Rogers lucha por los ideales de libertad y justicia como el Capitán América en un mundo moderno.',
    precio: 2420
  },
  {
    id: 12,
    nombre: 'Avengers: Khonshu',
    imagen: 'img/foto12.jpg',
    descripcion: 'Desde los reinos de Asgard hasta la Tierra, sigue las épicas aventuras del Dios del Trueno, Thor Odinson.',
    precio: 2520
  },
  {
    id: 13,
    nombre: 'Avengers: Black Panther',
    imagen: 'img/foto13.jpg',
    descripcion: 'Adéntrate en la nación de Wakanda con T\'Challa, el rey y protector conocido como Black Panther.',
    precio: 2620
  },
  {
    id: 14,
    nombre: 'X-Men',
    imagen: 'img/foto14.jpg',
    descripcion: 'Viaja a través de las dimensiones con Stephen Strange, el Hechicero Supremo, defendiendo nuestro reino de amenazas místicas.',
    precio: 2280
  },
  {
    id: 15,
    nombre: 'Avengers: Doom',
    imagen: 'img/foto15.jpg',
    descripcion: 'Carol Danvers toma vuelo como Captain Marvel, una de las heroínas más poderosas del universo, luchando en batallas cósmicas.',
    precio: 2380
  },
  {
    id: 16,
    nombre: 'The Avengers',
    imagen: 'img/foto16.jpg',
    descripcion: 'Cuando las amenazas son demasiado grandes para un solo héroe, los Vengadores se unen para salvar el planeta.',
    precio: 2480
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const cartSidebar = document.getElementById('cart');
  if (cartSidebar.classList.contains('show')) {
    cartSidebar.classList.remove('show');
  }
});

// ===============================
// Carga inicial de productos
// ===============================
const contenedorProductos = document.getElementById('product-list');

productos.forEach((producto) => {
  const col = document.createElement('div');
  //col.classList.add('col-md-3', 'mb-4');
  col.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3', 'mb-4');
  col.innerHTML = `
    <div class="card h-100">
      <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${producto.nombre}</h5>
        <p class="card-text">$${producto.precio}</p>
        <button class="btn btn-primary mt-auto" onclick="verProducto(${producto.id})">Ver más</button>
      </div>
    </div>
  `;
  contenedorProductos.appendChild(col);
});

// ===============================
// Mostrar modal de producto
// ===============================
let productoActual = null;
let modalProducto; // Declaramos esta variable aquí

function verProducto(id) {
  const producto = productos.find(p => p.id === id);
  productoActual = producto;

  document.getElementById('modal-title').textContent = producto.nombre;
  document.getElementById('modal-img').src = producto.imagen;
  document.getElementById('modal-desc').textContent = producto.descripcion;
  document.getElementById('modal-price').textContent = producto.precio;

  modalProducto = new bootstrap.Modal(document.getElementById('productModal')); // Asignamos la instancia a la variable
  modalProducto.show();
}

// ===============================
// Carrito de compras con localStorage
// ===============================
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarritoUI();
}

// ===============================
// Agregar producto desde modal
// ===============================
document.getElementById('modal-buy-btn').addEventListener('click', () => {
  const existe = carrito.find(item => item.id === productoActual.id);
  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({ ...productoActual, cantidad: 1 });
  }
  guardarCarrito();
  modalProducto.hide(); // Cerramos el modal aquí

  // === Bloque para el mensaje de notificación ===
  const notification = document.getElementById('cart-notification');
  notification.classList.remove('d-none');
  setTimeout(() => {
    notification.classList.add('d-none');
  }, 3000); // Ocultar después de 3 segundos

});

// ===============================
// Mostrar y ocultar carrito
// ===============================
document.getElementById('cart-btn').addEventListener('click', () => {
  document.getElementById('cart').classList.toggle('show');
});

document.getElementById('close-cart-btn').addEventListener('click', () => {
  document.getElementById('cart').classList.remove('show');
});


// ===============================
// Actualizar UI del carrito
// ===============================
function actualizarCarritoUI() {
  const contenedor = document.getElementById('cart-items');
  const totalSpan = document.getElementById('cart-total');
  const contador = document.getElementById('cart-count');

  contenedor.innerHTML = '';
  let total = 0;
  let cantidadTotal = 0;

  carrito.forEach(item => {
    total += item.precio * item.cantidad;
    cantidadTotal += item.cantidad;

    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');
    itemDiv.innerHTML = `
      <img src="${item.imagen}" alt="${item.nombre}" style="width: 40px; height: auto; margin-right: 10px;">
      <div style="flex-grow: 1;">
        <strong>${item.nombre}</strong><br>
        <small>Precio: $${item.precio}</small>
      </div>
      <div style="display: flex; align-items: center;">
        <button class="btn btn-sm btn-outline-secondary me-2" onclick="disminuir(${item.id})">-</button>
        <span>${item.cantidad}</span>
        <button class="btn btn-sm btn-outline-secondary ms-2" onclick="aumentar(${item.id})">+</button>
        <button class="btn btn-sm btn-danger ms-3" onclick="eliminar(${item.id})">🗑️</button>
      </div>
    `;
    contenedor.appendChild(itemDiv);
  });

  totalSpan.textContent = total;
  contador.textContent = cantidadTotal;
}

// ===============================
// Funciones de carrito
// ===============================
function aumentar(id) {
  const item = carrito.find(p => p.id === id);
  if (item) {
    item.cantidad++;
    guardarCarrito();
  }
}

function disminuir(id) {
  const item = carrito.find(p => p.id === id);
  if (item) {
    item.cantidad--;
    if (item.cantidad < 1) {
      carrito = carrito.filter(p => p.id !== id);
    }
    guardarCarrito();
  }
}

function eliminar(id) {
  carrito = carrito.filter(p => p.id !== id);
  guardarCarrito();
}

document.getElementById('clear-cart-btn').addEventListener('click', () => {
  carrito = [];
  guardarCarrito();
});

// ===============================
// Finalizar compra
// ===============================
document.getElementById('checkout-btn').addEventListener('click', () => {
  if (carrito.length === 0) return alert('El carrito está vacío.');

  alert('Gracias por tu compra 😊');
  carrito = [];
  guardarCarrito();
  document.getElementById('cart').classList.remove('show');
});

// ===============================
// Inicialización
// ===============================
actualizarCarritoUI();
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('cart').classList.remove('show');
});
