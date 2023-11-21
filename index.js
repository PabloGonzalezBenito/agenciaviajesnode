//las funciones del archivo package.json son:
//1. manejar las dependencias (de momento, express y nodemon)
//2. arrancar este archivo 
//Para arrancar el servidor:
//vamos a package.json, y en apartado "scripts", escribimos "dev": "nodemon index.js"
//vamos a la consola de comandos y escribimos: npm run dev


//Importamos express

//para poder utilizar modulos, tenemos que ir a package.json y 
//antes del author, escribir "type":"module"
import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

console.log(process.env.DATABASE)

//ejecutamos express y lo asignamos a la variable app
const app = express();


//conectar db
db.authenticate()
.then(() => console.log('Base de datos conectada'))
.catch(error => console.log(error));

//Definir puerto
//process.env.port es una variable de entorno
//en desarrollo esa variable no va a existir, pero en produccion si
const port = process.env.PORT || 4000;

//habilitar PUG
app.set('view engine','pug');

//Obtener el año actual
app.use((req,res,next) => {
const year = new Date();
res.locals.ActualYear = year.getFullYear();
res.locals.nombresitio = "Agencia de Viajes";
return next();
})

//Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended:true}));

//Definir la carpeta publica
app.use(express.static('public'));

//Agregar Router
//desde la pagina principal, agrega router
app.use('/',router);


//arrancamos el servidor mediante la funcion .listen(). a esta funcion
//le pasamos el puerto y un callback
app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});