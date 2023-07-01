// Cargar las variables de entorno del archivo .env
require("dotenv").config();

// Importar el módulo Express
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Importar las funciones del gestor de frutas
const { leerFrutas, guardarFrutas } = require("./src/frutasManager");

// Configurar el número de puerto para el servidor
const PORT = process.env.PORT || 3000;

// Crear un arreglo vacío para almacenar los datos de las frutas
let BD = [];

// Configurar el middleware para analizar el cuerpo de las solicitudes como JSON

app.use(express.json());
app.use(bodyParser.json());

// Middleware para leer los datos de las frutas antes de cada solicitud
app.use((req, res, next) => {
  BD = leerFrutas(); // Leer los datos de las frutas desde el archivo
  next(); // Pasar al siguiente middleware o ruta
});

// Ruta principal que devuelve los datos de las frutas
app.get("/", (req, res) => {
  res.send(BD);
});

// Ruta para agregar una nueva fruta al arreglo y guardar los cambios
app.post("/", (req, res) => {
  const nuevaFruta = req.body;
  BD.push(nuevaFruta); // Agregar la nueva fruta al arreglo
  guardarFrutas(BD); // Guardar los cambios en el archivo
  res.status(201).send("Fruta agregada!"); // Enviar una respuesta exitosa
});

app.put("/frutachange/id/:id", (req, res) => {
  //Find para devolver una sola fruta por el id y cambiarla o crear fruta sino existe
  let parametro = parseInt(req.params.id); //Transforma a string a int
  const result = BD.find((i) => i.id === parametro); //Busca coincidencias
  if (result) {
    const find = (elment) => elment === result;
    const otraFruta = req.body;
    BD[BD.findIndex(find)] = otraFruta;
    guardarFrutas(BD);
    res
      .status(200)
      .send(`Se cambiaron los valores correctamente en id:${parametro}!.`);
  } else {
    const nuevaFruta = req.body;
    BD.push(nuevaFruta); // Agregar la nueva fruta al arreglo
    guardarFrutas(BD); // Guardar los cambios en el archivo
    res
      .status(201)
      .send(
        `Se agrego una fruta con id:${parametro} al no encrontrar coincidencias de Id!.`
      );
  }
});

app.delete("/frutaout/id/:id", (req, res) => {
  //borrar apartir de un id
  let parametro = parseInt(req.params.id);
  const result = BD.find((i) => i.id === parametro);
  if (result) {
    BD = BD.filter((item) => item.id !== parametro);
    guardarFrutas(BD);
    res
      .status(200)
      .send(`Se elimino el archivo con id:${parametro} correctamente!. `);
  } else {
    res.send(`No existe fruta con id correspondente al id:${parametro}.`);
  }
});

app.get("/frutaseek/id/:id", (req, res) => {
  //un find para devolver una sola fruta por el id
  let parametro = parseInt(req.params.id);
  const result = BD.find((i) => i.id === parametro);
  result
    ? res.json(result)
    : res.json([
        { id: "Error", descripcion: "No se encontraron coincidencias de id." },
      ]);
});

// Ruta para manejar las solicitudes a rutas no existentes
app.get("*", (req, res) => {
  res.status(404).send("Lo sentimos, la página que buscas no existe.");
});

// Iniciar el servidor y escuchar en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

/**
  *11.- Genera las rutas solicitadas en el archivo server.js Deberás agregar los métodos HTTP faltantes:
PUT
DELETE
GET :id

  *12.- Realiza las peticiones según las rutas indicadas( Ruta base: http://localhost:3008/) , a través de la extensión Thunder Client de VSC o con tu aplicación de testeo de rutas favorita.(Postman, Hoppscotch, Insomnia, Rapid Client). 
 **/
