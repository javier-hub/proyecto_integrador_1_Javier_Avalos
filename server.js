// Cargar las variables de entorno del archivo .env
require("dotenv").config();

const fs = require("fs").promises;

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

// Ruta para modificar una fruta existente por su ID
app.put("/frutachange/id/:id", (req, res) => {
  let parametro = parseInt(req.params.id); // Obtener el ID de la URL y convertirlo a número entero

  // Buscar el producto por su ID
  const resultado = BD.find((fruta) => fruta.id === parametro);

  if (resultado) {
    const find = (elment) => elment === resultado;
    const otraFruta = req.body;
    BD[BD.findIndex(find)] = otraFruta;
    guardarFrutas(BD);
    res.status(200).send("Producto modificado correctamente.");
  } else {
    const nuevaFruta = req.body;
    BD.push(nuevaFruta); // Agregar la nueva fruta al arreglo
    guardarFrutas(BD); // Guardar los cambios en el archivo
    res.status(201).send("Fruta agregada!");
  }
});

// Ruta para eliminar una fruta por su ID
app.delete("/frutaout/id/:id", (req, res) => {
  let parametro = parseInt(req.params.id); // Obtener el ID de la URL y convertirlo a número entero
  // Buscar el producto por su ID
  const index = BD.findIndex((fruta) => fruta.id === parametro);

  if (index !== -1) {
    // Eliminar el producto del array de frutas usando splice()
    BD.splice(index, 1);

    res.status(200).send("Producto eliminado correctamente.");
  } else {
    res.status(404).send("No se encontró el producto.");
  }
});

// Ruta para obtener un producto por su ID
app.get("/frutaseek/id/:id", (req, res) => {
  //un find para devolver una sola fruta por el id
  let parametro = parseInt(req.params.id);
  // Buscar el producto por su ID utilizando el método find()
  const result = BD.find((fruta) => fruta.id === parametro);
  result
    ? res.json(result)
    : res.status(404).json([
        {
          id: "Error 404",
          descripcion: "No se encontró el producto.",
        },
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
