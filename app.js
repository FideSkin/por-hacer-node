// Requerimos el path del archivo que creamos
const argv = require('./config/yargs').argv;
const porHacer = require('./to-do/to-do');

let comando = argv._[0];

// Realizamos un switch segun la accion que necesitamos
switch (comando) {
  case 'crear':

    let tarea = porHacer.crear(argv.descripcion);
    console.log(tarea);
    break;

  case 'listar':
    let listado = porHacer.getListado();
    break;

  case 'actualizar':

    let actualizar = porHacer.actualizar(argv.descripcion, argv.completado);
    console.log(actualizar);
    break;

  case 'borrar':

    let borrado = porHacer.borrar(argv.descripcion);
    console.log(borrado);
    break;

  default:
    console.log('Comando no reconocido!');
}
