
class Persona {
  id;
  dni;
  apellido;
  nombre;
  constructor(id, nombre, apellido, dni) {
    this.Id = parseInt(id);
    this.Dni = parseInt(dni);
    this.Nombre = nombre;
    this.Apellido = apellido;
  }
  get Id() {
    return this.id;
  }
  get Nombre() {
    return this.nombre;
  }
  get Apellido() {
    return this.apellido;
  }
  get Dni() {
    return this.dni;
  }
  set Id(value) {
    if (isNaN(value)) throw new Error('El Id ingresado es invalido');
    this.id = value;
  }
  set Dni(value) {
    if (isNaN(value) || value.toString().length > 9 || value.toString().length < 7 ) throw new Error('El DNI ingresado es invalido (El largo del dni debe ser entre 7 y 8 caracteres)');
    this.dni = value;
  }
  set Nombre(value) {
    if (!value || value.length <= 0) throw new Error('El nombre ingresado es invalido');
    this.nombre = value.toUpperCase();
  }
  set Apellido(value) {
    if (!value || value.length <= 0) throw new Error('El apellido ingresado es invalido');
    this.apellido = value.toUpperCase();
  }
  toString() {
    const retorno = `Id: ${this.Id}\
    Dni: ${this.Dni}\
    Nombre: ${this.Nombre}\
    Apellido: ${this.Apellido}`;
    return retorno;
  }
}

class Alumno extends Persona {
  cursoLetra;
  cursoNumero;
  constructor(id, nombre, apellido, dni, cursoLetra, cursoNumero) {
    super(id, nombre, apellido, dni);
    this.CursoNumero = parseInt(cursoNumero);
    this.CursoLetra = cursoLetra;
  }
  get CursoLetra() {
    return this.cursoLetra;
  }
  get CursoNumero() {
    return this.cursoNumero;
  }
  set CursoLetra(value) {
    if (!value || value.length !== 1) throw new Error('La letra del curso ingresada es invalida (Debe ser sólo una letra)');
    this.cursoLetra = value.toUpperCase();
  }
  set CursoNumero(value) {
    if (isNaN(value)) throw new Error('El número del curso ingresado es invalido');
    this.cursoNumero = value;
  }
  toString() {
    const retorno = `Alumno:\
    ${super.toString()}\
    Letra del curso: ${this.cursoLetra}\
    Numero del curso: ${this.cursoNumero}`;
    return retorno;
  }
}

class Docente extends Persona {
  materia;
  año;
  constructor(id, nombre, apellido, dni, materia, año) {
    super(id, nombre, apellido, dni);
    this.Materia = materia;
    this.Año = parseFloat(año);
  }
  get Materia() {
    return this.materia;
  }
  get Año() {
    return this.año;
  }
  set Materia(value) {
    if (!value || value.length <= 0) throw new Error('La materia ingresada es invalida');
    this.materia = value;
  }
  set Año(value) {
    if (isNaN(value)) throw new Error('El año ingresado es invalido');
    this.año = value;
  }
  toString() {
    const retorno = `Docente:\
    ${super.toString()}\
    Materia: ${this.Materia}\
    Año: ${this.Año}`;
    return retorno;
  }
}

/**
 * Método encargado de castear el json string al array de personas con la instancia correspondiente
 * @param {*} arrayObjetos
 * @returns
 */
const castJsonStringAInstancia = (arrayObjetos) => {
  const personas = [];
  arrayObjetos.forEach(personaInfo => {
    let persona;
    if (personaInfo?.materia != undefined) {
      persona = new Docente(personaInfo.id, personaInfo.nombre, personaInfo.apellido, personaInfo.dni, personaInfo.materia, personaInfo.año);
    } else {
      persona = new Alumno(personaInfo.id, personaInfo.nombre, personaInfo.apellido,personaInfo.dni, personaInfo.cursoLetra, personaInfo.cursoNumero);
    }
    personas.push(persona);
  });
  return personas;
}
let listadoPersonas;

window.addEventListener('load', () => {
  // Setea los eventos y carga el listado inicial
  let stringJson = '[{"id":1,"dni":17663295,"nombre":"FABIAN MARCELO","apellido":"ABADIE","cursoNumero":1,"cursoLetra":"F"},{"id":2,"dni":38724762,"nombre":"MAIRA DAIANA","apellido":"ABALOS","cursoNumero":3,"cursoLetra":"M"},{"id":3,"dni":25447357,"nombre":"NOELIA LIDIA","apellido":"ABBA","cursoNumero":2,"cursoLetra":"N"},{"id":4,"dni":27577699,"nombre":"MARÍA SOLEDAD","apellido":"ACHOR","cursoNumero":2,"cursoLetra":"M"},{"id":900,"dni":11496581,"nombre":"JOSE MIGUEL","apellido":"ARMALEO","materia":"Fisica","año":1},{"id":899,"dni":35326658,"nombre":"ROSA DEL VALLE","apellido":"LOPEZ","materia":"Lengua","año":3},{"id":898,"dni":39638351,"nombre":"DANIELA BELEN","apellido":"BROGGI D`ATENA","materia":"Matematica","año":3},{"id":897,"dni":17275566,"nombre":"PABLO ALBERTO","apellido":"ALMEIDA","materia":"Quimica","año":1}]';

  // Se parsean las instancias
  const jsonArray = JSON.parse(stringJson);
  listadoPersonas = castJsonStringAInstancia(jsonArray);
  // Se setean los eventos
  setearEventos();
  // Se carga la informacion en la tabla
  recargarTabla(listadoPersonas);

  // Se marcan como chequeados los checkbox
  document.getElementById("chkID").checked = true;
  document.getElementById("chkDni").checked = true;
  document.getElementById("chkApellido").checked = true;
  document.getElementById("chkCursoNumero").checked = true;
  document.getElementById("chkCursoLetra").checked = true;
  document.getElementById("chkMateria").checked = true;
  document.getElementById("chkNombre").checked = true;
  document.getElementById("chkAño").checked = true;

})

/**
 * Mètodo encargado de setear los eventos
 */
const setearEventos = () => {
  // Agrega los eventos a los botones
  const btnAgregar = document.getElementById("btnAgregarTabla");
  btnAgregar.addEventListener("click", () => formAgregar());
  const btnCalcular = document.getElementById("btnCalcularPormId");
  btnCalcular.addEventListener("click", () => calcularPromDni());
  // Agrega los eventos a los checkbox
  let btnChk = document.getElementById("chkID");
  btnChk.addEventListener("click", e => chkCambio(e));
  // Agrega el evento al check de Dni
  btnChk = document.getElementById("chkDni");
  btnChk.addEventListener("click", e => chkCambio(e));
  // Agrega los eventos a los Id
  btnChk = document.getElementById("chkApellido");
  btnChk.addEventListener("click", e => chkCambio(e));
  // Agrega los eventos a los Id
  btnChk = document.getElementById("chkNombre");
  btnChk.addEventListener("click", e => chkCambio(e));
  // Agrega los eventos a los Id
  btnChk = document.getElementById("chkCursoNumero");
  btnChk.addEventListener("click", e => chkCambio(e));
  // Agrega los eventos a los Id
  btnChk = document.getElementById("chkCursoLetra");
  btnChk.addEventListener("click", e => chkCambio(e));
  // Agrega los eventos a los Id
  btnChk = document.getElementById("chkMateria");
  btnChk.addEventListener("click", e => chkCambio(e));
  // Agrega los eventos a los Id
  btnChk = document.getElementById("chkAño");
  btnChk.addEventListener("click", e => chkCambio(e));
  // Agrega evento ordenar a las cabeceras
  const btnsOrdenar = document.getElementsByClassName("btnColumna");
  for (let i = 0; i < btnsOrdenar.length; i++) {
    btnsOrdenar.item(i).onclick = e => ordenarTabla(e)
  }
  const filtroSelect = document.getElementById("filtro");
  filtroSelect.addEventListener("change", e => recargarTabla(listadoPersonas));

  // Agrega los eventos de ABM
  // Agrega los eventos a los botones
  const btnCancelarForm = document.getElementById("btnCancelarForm");
  btnCancelarForm.addEventListener("click", () => {
    MostrarOcultarElemento("registros", false);
    MostrarOcultarElemento("formABM", true);
  });
  const btnModificarForm = document.getElementById("btnModificarForm");
  btnModificarForm.addEventListener("click", () => {
    modificarItem();
  });
  const btnEliminarForm = document.getElementById("btnEliminarForm");
  btnEliminarForm.addEventListener("click", () => {
    eliminarItem();
  });
    // Agrega los eventos al boton Agregar
  const btnAgregarForm = document.getElementById("btnAgregarForm");
  btnAgregarForm.addEventListener("click", () => {
    agregarItem("registros");
  });
  const tipoUsuario = document.getElementById("tipoUsuario");
  tipoUsuario.addEventListener("change", e => ocultarSegunTipo(e.target.value));
  // Oculta el formulario
  MostrarOcultarElemento("formABM", true);
}

/**
 * Funcion encargada de ocultar o mostrar las columnas cuando se realiza el cambio del checkbox
 * @param {_} e
 */
const chkCambio = (e) => {
  element = document.getElementById(e.target.value);
  let display = !e.target.checked ? 'none' : '';
  element.style.display = display;
  ocultarColumna(e.target.value, display);
}

/**
 * Funcion encargada de ocultar una columna y los campos de la fila correspondiente
 * @param {*} nombreColumna
 * @param {*} display
 */
const ocultarColumna = (nombreColumna, display) => {
  const filas = document.getElementById('cuerpo').getElementsByTagName('tr');
  for (i = 0; i < filas.length; i++) {
    const campo = filas[i].querySelectorAll("[columna=" + nombreColumna + "]");
    if (campo && campo.length > 0)
      campo[0].style.display = display;
  }
}

/**
 * Funcion Encargada de ordenar la tabla
 * @param {*} e
 */
const ordenarTabla = (e) => {
  const listaOrdenada = listadoPersonas.sort((personaUno, personaDos) => ordenarPersonasCreciente(personaUno,personaDos, e.target.id));
  recargarTabla(listaOrdenada);
}

/**
 * Funcion con el criterio de comparacion segun el atributo de comparacion seleccionado
 * @param {*} personaUno
 * @param {*} personaDos
 * @returns
 */
const ordenarPersonasCreciente = (personaUno, personaDos, atributoAComparar) => {
  let valorUno;
  let valorDos;
  switch (atributoAComparar) {
    case "btnId":
      valorUno = personaUno.Id;
      valorDos = personaDos.Id;
      break;
    case "btnDni":
      valorUno = personaUno.Dni;
      valorDos = personaDos.Dni;
      break;
    case "btnApellido":
      valorUno = personaUno.Apellido;
      valorDos = personaDos.Apellido;
      break;
    case "btnNombre":
      valorUno = personaUno.Nombre;
      valorDos = personaDos.Nombre;
      break;
    case "btnCursoNumero":
      valorUno = personaUno.CursoNumero;
      valorDos = personaDos.CursoNumero;
      break;
    case "btnCursoLetra":
      valorUno = personaUno.CursoLetra;
      valorDos = personaDos.CursoLetra;
      break;
    case "btnMateria":
      valorUno = personaUno.Materia;
      valorDos = personaDos.Materia;
      break;
    case "btnAño":
      valorUno = personaUno.Año;
      valorDos = personaDos.Año;
      break;
  }
  if (!valorUno) return -1;
  if (!valorDos) return 1;
  return valorUno > valorDos ? 1 : -1;
}

/**
 * Funcion encargada de crear una fila
 * @param { idColumna: "", data: } columnasData
 */
const crearFila = (columnasData) => {
  // Se crea la nueva fila
  const fila = document.createElement("tr");
  // Agrega los campos correspondientes a cada columna
  columnasData.forEach(columnaInfo => {
    // Se incorpora el evento doble click sobre la fila
    fila.addEventListener("dblclick", e => modificarEliminar(e.target.parentNode, "idColum"));
    // Se crea el campo
    const elemento = document.createElement("td");
    // Se le incorpora el contendio
    elemento.appendChild(document.createTextNode(columnaInfo?.data ?? 'N/A'));
    // Se setea el atributo identificador de la columna a la que corresponde el campo
    elemento.setAttribute("columna", columnaInfo.idColumna);
    // Se le setea al campo el mismo estado de visibilidad que la columna a la que pertenece
    elemento.style.display = document.getElementById(columnaInfo.idColumna).style.display;
    // Se agrega el campo a la fila
    fila.appendChild(elemento);
  });

  // Agrega la fila al cuerpo
  document.getElementById("cuerpo").appendChild(fila);
}

/**
 * Función encargada de recargar la tabla
 * @param {*} lista
 */
const recargarTabla = (lista) => {
  let cuerpoTabla = document.getElementById('cuerpo');
  let filasTabla = cuerpoTabla.getElementsByTagName('tr');
  let rowCount = filasTabla.length;
  for (let i = 0; i < rowCount; i++) {
    cuerpoTabla.removeChild(filasTabla[rowCount - 1 - i]);
  }
  // Obtiene el valor el valor filtrado y filtra la columna
  const filtro = document.getElementById("filtro").value.toUpperCase()
  lista = filtrarLista(filtro, lista);
  // Crea las filas correspondientes
  lista.forEach(persona => {
    const columnasData = [{ idColumna: "idColum", data: persona.Id },
    { idColumna: "dniColum", data: persona.Dni },
    { idColumna: "apellidoColum", data: persona.Apellido },
    { idColumna: "nombreColum", data: persona.Nombre },
    { idColumna: "cursoNumeroColum", data: persona.CursoNumero },
    { idColumna: "cursoLetraColum", data: persona.cursoLetra },
    { idColumna: "materiaColum", data: persona.Materia },
    { idColumna: "añoColum", data: persona.Año }];
    crearFila(columnasData);
  });
}

/**
 * Funcion encargada de calcular y mostrar el id promedio
 */
const calcularPromDni = () => {
  // Obtiene el valor el valor filtrado
  const filtro = document.getElementById("filtro").value.toUpperCase()
  const listaEnPantalla = filtrarLista(filtro, listadoPersonas);
  const sumatoriaDni = listaEnPantalla.reduce((dniAnterior, elementoActual) => dniAnterior + elementoActual.Dni, 0);
  document.getElementById("idPromedio").value = (sumatoriaDni / listadoPersonas.length).toFixed(2);
}

/**
 * Funcion encargada de filtrar la lista según el tipo seleccionado
 * @param {*} filtro
 * @param {*} listadoAFiltrar
 * @returns
 */
const filtrarLista = (filtro, listadoAFiltrar) => {
  let listadoFiltrado = listadoAFiltrar;
  switch (filtro) {
    case 'ALUMNOS':
      listadoFiltrado = listadoPersonas.filter(persona => persona instanceof Alumno);
      break;
    case 'DOCENTES':
      listadoFiltrado = listadoPersonas.filter(persona => persona instanceof Docente);
      break;
  }
  return listadoFiltrado;
}

// Funciones correspondientes al ABM
/**
 * Funcion encargada de mostrar u ocultar un elemento
 * @param {*} idForm
 * @param {*} ocultar
 */
const MostrarOcultarElemento = (idForm, ocultar, displayType) => {
  const formElement = document.getElementById(idForm);
  const tipoDisplay = displayType ?? "";
  formElement.style.display = ocultar ? 'none' : tipoDisplay;
}

//
// ABM
//

/**
 * Funcion encargada de abrir el formulario de modificacion y eliminacion
 * ocultando y mostrando los elementos correspondientes
 * @param {*} fila
 * @param {*} idColumna
 */
const modificarEliminar = (fila, idColumna) => {
  const id = parseInt(fila.querySelectorAll("[columna=" + idColumna + "]")[0].innerText);
  const elementoAModificar = buscarPorId(id);
  if (!elementoAModificar) throw new Error('No se encontro el id a modificar/eliminar');
  // Muestra los botones
  MostrarOcultarElemento("btnAgregarForm", true);
  MostrarOcultarElemento("btnModificarForm", false);
  MostrarOcultarElemento("btnEliminarForm", false);

  // Esconde los campos segun la instancia
  if (elementoAModificar instanceof Alumno) {
    ocultarSegunTipo("Alumno");
  } else {
    ocultarSegunTipo("Docente");
  }
  // Carga los datos al formulario
  document.getElementById("idForm").value = elementoAModificar.Id;
  document.getElementById("dniForm").value = elementoAModificar.Dni;
  document.getElementById("apellidoForm").value = elementoAModificar.Apellido;
  document.getElementById("nombreForm").value = elementoAModificar.Nombre;
  document.getElementById("cursoLetraForm").value = elementoAModificar.CursoLetra ?? "";
  document.getElementById("cursoNumeroForm").value = elementoAModificar.CursoNumero ?? "";
  document.getElementById("materiaForm").value = elementoAModificar.Materia ?? "";
  document.getElementById("añoForm").value = elementoAModificar.Año ?? "";
  MostrarOcultarElemento("registros", true);
  MostrarOcultarElemento("formABM", false, "flex");

  const titulo = document.getElementById("tituloABM");
  if(titulo.childNodes.length > 0)
    titulo.removeChild(titulo.childNodes[0]);
  titulo.appendChild(document.createTextNode("Form Modificar/Eliminar"));

  // Bloquea los campos que no se pueden modificar
  BloquarDesbloquearCamposForm(true);
}

/**
 * Funcion encargada de mostrar y ocultar los elementos segun el tipo seleccionado
 * @param {*} tipo
 */
const ocultarSegunTipo = (tipo) => {
  switch (tipo) {
    case "Docente":
      document.getElementById("grupoCursoLetra").style.display = 'none';
      document.getElementById("grupoCursoNumero").style.display = 'none';
      document.getElementById("grupoMateriaForm").style.display = '';
      document.getElementById("grupoAñoForm").style.display = '';
      document.getElementById("tipoUsuario").value = "Docente";
      break;
    case "Alumno":
      document.getElementById("grupoCursoLetra").style.display = '';
      document.getElementById("grupoCursoNumero").style.display = '';
      document.getElementById("grupoMateriaForm").style.display = 'none';
      document.getElementById("grupoAñoForm").style.display = 'none';
      document.getElementById("tipoUsuario").value = "Alumno";
      break;
  }
}

/**
 * Funcion encargada de bloquear los campos del formulario
 * @param {*} bloquear
 */
const BloquarDesbloquearCamposForm = (bloquear) => {
  document.getElementById("idForm").setAttribute('disabled', '');
  if (bloquear) {
    document.getElementById("dniForm").setAttribute('disabled', '');
  } else {
    document.getElementById("dniForm").removeAttribute('disabled');
  }
}

//
// Funciones correspondientes a cada boton del ABM
//

/**
 * Funcion encargada de obtner la informacion a modificar,
 * validarla y en caso de ser correcta realizar la modificacion.
 * Caso contrario mostrar mensaje de alerta
 */
const modificarItem = () => {
  try {
    const dataForm = obtenerDataABM();
    listadoPersonas = listadoPersonas.map(persona => {
      if (persona.id === dataForm.id) {
        return dataForm;
      }
      return persona;
    });
    volver();
  } catch (e) {
    window.alert(e.message);
  }
}

/**
 * Funcion encargada de obtner la informacion a agregar,
 * validarla y en caso de ser correcta agregar al listado.
 * Caso contrario mostrar mensaje de alerta
 */
const agregarItem = () => {
  try {
    // Valida que el id no exista
    const dataForm = obtenerDataABM();
    if (buscarPorId(dataForm.id)) throw new Error()
    listadoPersonas.push(dataForm);
    console.log(`Persona agregada: ${dataForm}`);
    volver();
  } catch (e) {
    window.alert(e.message);
  }
}

/**
 * Funcion encargada de obtner la informacion a eliminar,
 * validarla y en caso de ser correcta eliminar del listado.
 * Caso contrario mostrar mensaje de alerta
 */
const eliminarItem = () => {
  try {
    const dataForm = obtenerDataABM();
    listadoPersonas = listadoPersonas.filter(persona => persona.id != dataForm.id);
    volver();
  } catch (e) {
    window.alert(e.message);
  }
}

/**
 * Funcion encargada de buscar por id una unstancia en la lista y retornarla
 * @param {*} id
 * @returns
 */
const buscarPorId = (id) => {
  return listadoPersonas.find(persona => persona.id == id);
}

/**
 * Funcion encargada de volver al listado
 */
const volver = () => {
  MostrarOcultarElemento("registros", false);
  MostrarOcultarElemento("formABM", true);
  recargarTabla(listadoPersonas);
}

/**
 * Funcion encargada de limpiar el listado de campos pasados por parametro
 * @param {*} camposId
 */
const formABMLimpiarCampos = (camposId) => {
  camposId.forEach(idCampo => {
    document.getElementById(idCampo).value = "";
  });
}

/**
 * Funcion encargada de obtener la infromacion ingresada en el ABM
 * @returns
 */
const obtenerDataABM = () => {
  const data = {
    id: document.getElementById("idForm").value,
    dni: document.getElementById("dniForm").value,
    apellido: document.getElementById("apellidoForm").value,
    nombre: document.getElementById("nombreForm").value,
    cursoLetra: document.getElementById("cursoLetraForm")?.value ?? null,
    cursoNumero: document.getElementById("cursoNumeroForm")?.value ?? null,
    año: document.getElementById("añoForm")?.value ?? null,
    materia: document.getElementById("materiaForm")?.value ?? null
  };
  const tipo = document.getElementById("tipoUsuario").value;
  let retorno = null;
  switch (tipo) {
    case 'Alumno':
      retorno = new Alumno(data.id, data.nombre, data.apellido, data.dni, data.cursoLetra, data.cursoNumero);
      break;
    case 'Docente':
      retorno = new Docente(data.id, data.nombre, data.apellido, data.dni, data.materia, data.año);
      break;
  }
  return retorno;
}

/**
 * Funcion encargada de generar un id unico
 * @returns
 */
const generarIdUnico = () => {
  const idList = listadoPersonas.map(persona => persona.id);
  let idUnico;
  for(let i = 0; ; i++ ) {
    if(!idList.includes(i))
    {
      idUnico = i;
      break;
    }
  }
  return idUnico;
}

/**
 * Funcion encargada de inciializar el formulario del ABM al agregar
 */
const formAgregar = () => {
  MostrarOcultarElemento("registros", true);
  MostrarOcultarElemento("btnAgregarForm", false);
  MostrarOcultarElemento("formABM", false, "flex");
  MostrarOcultarElemento("btnAgregarForm", false);
  MostrarOcultarElemento("btnModificarForm", true);
  MostrarOcultarElemento("btnEliminarForm", true);
  const titulo = document.getElementById("tituloABM");
  if(titulo.childNodes.length > 0)
    titulo.removeChild(titulo.childNodes[0]);
  titulo.appendChild(document.createTextNode("Form Alta"));
  ocultarSegunTipo(document.getElementById("tipoUsuario").value);
  formABMLimpiarCampos(["apellidoForm", "dniForm", "nombreForm", "cursoLetraForm",
  "cursoNumeroForm", "materiaForm", "añoForm"]);
  document.getElementById("idForm").value = generarIdUnico();
  BloquarDesbloquearCamposForm(false);
}
