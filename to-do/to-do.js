// Requerimos el filesystem para poder guardar los datos en un lugar fisico
const fs = require('fs');
const colors = require('colors');



let listadoPorHacer = [];

// Funcion para crear db
const guardarDB = () =>{

  let data = JSON.stringify(listadoPorHacer);

  fs.writeFile(`db/db.json`, data, (err) => {
    if(err) throw new Error('No se pudo guardar', err);
  })

}

// Const para cargar los archivos de la DB
const cargarDB = () => {

  try {
    listadoPorHacer = require('../db/db.json');
  } catch (e) {
    listadoPorHacer = [];
  }

}


// Creamos la funcion crear y creamos porHacer
const crear = (descripcion) => {
  // Para que los archivos se creen y no se reemplacen, debemos cargar la db antes de push
  cargarDB();

  let porHacer = {
    descripcion,
    completado: false
  };

  listadoPorHacer.push(porHacer);

  guardarDB();

  return porHacer;

}

const getListado = () => {

  cargarDB();
  listado = listadoPorHacer;

  console.log(`========Por hacer========`.green);
  for(let tarea of listado) {
    console.log(tarea.descripcion);
    console.log(`Estado: ${ tarea.completado }`);
    console.log(`=========================`.green);
  }

}

const actualizar = (descripcion, completado) => {

  cargarDB();

  // Buscamos la posicion del elemento y si coinciden
  let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

  // Verificamos que sea una posicion valida y cambiamos la propiedad
  if(index >= 0){
    listadoPorHacer[index].completado = completado;

    guardarDB();
    return true;
  } else {
    return false;
  }
}

const borrar = (descripcion) => {

    cargarDB();

    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if(nuevoListado.length === listadoPorHacer.length){
      return false;
    } else {
      listadoPorHacer = nuevoListado;
      guardarDB();
      return true;
    }
}


module.exports = {
  crear,
  getListado,
  actualizar,
  borrar
}
