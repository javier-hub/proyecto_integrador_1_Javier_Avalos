# proyecto_integrador_1_Javier_Avalos
PUT: este método HTTP permitirá modificar algún producto existente.
Debes agregar el parámetro :id en la URL para encontrar primero el producto, y
luego modificarlo de acuerdo a los datos enviados en el cuerpo del mensaje.
Recuerda retornar un mensaje de error si no encuentra el producto.
DELETE: este método HTTP eliminará un producto existente.
También debes agregar el parámetro :id en la URL para identificar el producto en
el array, y luego aplicar el método de array .splice().
Recuerda retornar un mensaje de error si no encuentra el producto.
GET:id: este es el método convencional que nos permite ubicar un producto.
En este caso, aplica el método de array .find() para ubicar el producto y retornarlo.
Recuerda retornar un mensaje de error si no encuentra el producto.
