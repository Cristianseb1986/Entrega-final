/******************************************
 * 🌙 MODO OSCURO / CLARO
 ******************************************/
const btnModo = document.getElementById("modo-btn");

if (btnModo) {
  btnModo.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    btnModo.innerHTML = document.body.classList.contains("dark")
      ? '<i class="fa-solid fa-sun"></i> Modo claro'
      : '<i class="fa-solid fa-moon"></i> Modo oscuro';

    localStorage.setItem("modoOscuro", document.body.classList.contains("dark")); // guarda elección
  });

  // Recuperar preferencia al cargar
  if (localStorage.getItem("modoOscuro") === "true") {
    document.body.classList.add("dark");
    btnModo.innerHTML = '<i class="fa-solid fa-sun"></i> Modo claro';
  }
}


/******************************************
 * 🧬 VALIDACIÓN DE FORMULARIOS (Contacto)
 ******************************************/
const formContacto = document.querySelector(".form-contacto");

if (formContacto) {
  formContacto.addEventListener("submit", function (e) {
    e.preventDefault();

    const inputs = this.querySelectorAll("input, textarea");
    let valido = true;
    let mensaje = "";

    inputs.forEach(input => {
      if (input.value.trim() === "") {
        valido = false;
        mensaje = "Todos los campos son obligatorios.";
      } else if (input.type === "email" && !validarEmail(input.value)) {
        valido = false;
        mensaje = "Ingresá un correo válido.";
      }
    });

    if (!valido) {
      mostrarMensaje(mensaje, "error");
    } else {
      mostrarMensaje("Mensaje enviado ✔", "ok");
      this.reset();
    }
  });
}

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


/******************************************
 * 🧪 CARRITO BIOTECNOLÓGICO CON LOCALSTORAGE
 ******************************************/
let carrito = JSON.parse(localStorage.getItem("carritoBiotec")) || [];

// Selección de productos
const cards = document.querySelectorAll(".card-producto");
cards.forEach(card => {
  card.addEventListener("click", () => {
    const titulo = card.querySelector("h3").textContent;
    carrito.push(titulo);
    guardarCarrito();
    mostrarMensaje(`Agregado al carrito: ${titulo}`, "ok");
    actualizarCarritoDOM();
  });
});

// Guardar en localStorage
function guardarCarrito() {
  localStorage.setItem("carritoBiotec", JSON.stringify(carrito));
}

// Mostrar carrito visualmente
function actualizarCarritoDOM() {
  let contenedor = document.getElementById("carrito");

  // Crear si no existe
  if (!contenedor) {
    contenedor = document.createElement("div");
    contenedor.id = "carrito";
    contenedor.classList.add("carrito-box");
    document.querySelector("main").appendChild(contenedor);
  }

  contenedor.innerHTML = "<h3>🛒 Carrito Biotecnológico</h3>";

  // Lista de productos con botón eliminar
  carrito.forEach((p, index) => {
    const item = document.createElement("div");
    item.className = "carrito-item";
    item.innerHTML = `
      <span>${p}</span>
      <button class="btn-eliminar" data-index="${index}">❌</button>
    `;
    contenedor.appendChild(item);
  });

  // Botón vaciar carrito
  if (carrito.length > 0) {
    const btnVaciar = document.createElement("button");
    btnVaciar.textContent = "Vaciar carrito 🧹";
    btnVaciar.className = "btn-vaciar";
    contenedor.appendChild(btnVaciar);

    btnVaciar.addEventListener("click", () => {
      carrito = [];
      guardarCarrito();
      actualizarCarritoDOM();
      mostrarMensaje("Carrito vaciado 🧹", "ok");
    });
  }

  // Eliminar individual
  document.querySelectorAll(".btn-eliminar").forEach(btn => {
    btn.addEventListener("click", () => {
      const i = btn.getAttribute("data-index");
      carrito.splice(i, 1);
      guardarCarrito();
      actualizarCarritoDOM();
      mostrarMensaje("Producto eliminado", "error");
    });
  });
}

// Render inicial si hay carrito guardado
actualizarCarritoDOM();


/******************************************
 * 📣 MENSAJE VISUAL EN PANTALLA
 ******************************************/
function mostrarMensaje(texto, tipo) {
  let msg = document.createElement("div");
  msg.className = tipo === "error" ? "msg-error" : "msg-ok";
  msg.textContent = texto;
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 3000);
}
