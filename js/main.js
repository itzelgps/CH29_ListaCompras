// El código va aquí -> 
let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");
let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");

let contadorProductos = document.getElementById("contadorProductos");
let productosTotal = document.getElementById("productosTotal");
let precioTotal = document.getElementById("precioTotal");

let tablaListaCompras = document.getElementById("tablaListaCompras");
let cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody");

let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
let alertValidaciones = document.getElementById("alertValidaciones");

let contador = 0;
let precio = 0;
let costoTotal = 0;
let totalEnProductos = 0;
let isValid = true;

let datos = new Array(); // Aqui lo camos a almacenar


btnClear.addEventListener("click", function (event) {
  event.preventDefault();
  txtNombre.value = "";
  txtNumber.value = "";
  cuerpoTabla[0].innerHTML = "";
  contadorProductos.innerText = "0";
  productosTotal.innerText = "0";
  precioTotal.innerText = "0";

  txtNumber.style.border = "";
  txtNombre.style.border = "";

  alertValidacionesTexto.innerHTML = "";
  alertValidaciones.style.display = "none";
  contador = 0;
  costoTotal = 0;
  totalEnProductos = 0;
  datos = [];
  localStorage.clear();
  localStorage.removeItem("datos");
  localStorage.removeItem("resumen");
});

function validarCantidad() {
  if (txtNumber.value.length == 0) {
    return false;
  } // if lenght

  if (isNaN(txtNumber.value)) {
    return false;
  } // if isNaN

  if (parseFloat(txtNumber.value)<=0) {
    return false;
  } // if
  return true;
}//validadCantidad

function getPrecio() {
  return Math.floor(Math.random() * 75 * 100)/100;
} // getPrecio

btnAgregar.addEventListener("click", function (event) {
  event.preventDefault();
  isValid = true;
  alertValidacionesTexto.innerHTML = "";
  alertValidaciones.style.display = "none";
  txtNumber.style.border = "";
  txtNombre.style.border = "";
  txtNumber.value = txtNumber.value.trim();
  txtNombre.value = txtNombre.value.trim();
  if (txtNombre.value.length < 3) {
    // error
    alertValidacionesTexto.insertAdjacentHTML("beforeend", `
    El <strong>Nombre</strong> no es corecto. <br/>`);
    alertValidaciones.style.display = "block";
    txtNombre.style.border = "solid thin red";
    isValid = false;
  }; // if nombre.length
  if (!validarCantidad()) {
    alertValidacionesTexto.insertAdjacentHTML("beforeend", `
    La <strong>Cantidad</strong> no es corecta. <br/>`);
    alertValidaciones.style.display = "block";
    txtNumber.style.border = "solid 3px red";
    isValid = false;
  }; // if validarCantidad

  if (isValid) {
    contador++;
    precio = getPrecio();
    let row = `<tr>
    <td>${contador}</td>
    <td>${txtNombre.value}</td>
    <td>${txtNumber.value}</td>
    <td>${precio}</td>
    </tr>`;

    let elemento = `{"id"     : ${contador},
                     "nombre" : "${txtNombre.value}",
                     "cantidad" : "${txtNumber.value}",
                     "precio"  :  "${precio}"}`;
    
    datos.push(JSON.parse(elemento));
    console.log(datos);
    localStorage.setItem("datos", JSON.stringify(datos));


    cuerpoTabla[0].insertAdjacentHTML("beforeend", row);
    contadorProductos.innerText = contador;
    costoTotal += precio * parseFloat(txtNumber.value);
    totalEnProductos += parseFloat(txtNumber.value);
    precioTotal.innerText = `$ ${costoTotal.toFixed(2)}`;
    productosTotal.innerText = totalEnProductos;

    let resumen = `{"contador" : ${contador},
                   "costoTotal" : ${costoTotal},
                   "totalEnProductos" : ${totalEnProductos}
                  }`;
    localStorage.setItem("resumen", resumen);

    // localStorage.setItem("contador", contador);
    // localStorage.setItem("costoTotal", costoTotal);
    // localStorage.setItem("totalEnProductos", totalEnProductos);

    txtNumber.value = "";
    txtNombre.value = "";
    txtNombre.focus();
  }; // if isValid
});


window.addEventListener("load", function (event) {
  event.preventDefault();

  if (this.localStorage.getItem("resumen") != null) {
    let res = JSON.parse(this.localStorage.getItem("resumen"));
    contador = parseInt(res.contador);
    costoTotal = parseInt(res.costoTotal);
    totalEnProductos = parseInt(res.totalEnProductos);
  } // if resumen
  
  contadorProductos.innerText = contador;
  precioTotal.innerText = `$ ${costoTotal.toFixed(2)}`;
  productosTotal.innerText = totalEnProductos;
  
  if (this.localStorage.getItem("datos") != null) {
    datos = JSON.parse(this.localStorage.getItem("datos"));
    datos.forEach((r) => {
      let row = `<tr>
            <td>${r.id}</td>
            <td>${r.nombre}</td>
            <td>${r.cantidad}</td>
            <td>$ ${r.precio}</td>
            </tr>`;
            cuerpoTabla[0].insertAdjacentHTML("beforeend", row);
    } // foreach
    );
    
  } // if datos
}); // windows // load



