import express from 'express';
import {
    paginaInicio, paginaNosotros, paginaViajes, paginaTestimoniales,
    paginaDetalleViaje
} from '../controllers/paginasController.js';
import { guardarTestimonial } from '../controllers/testimonialController.js';
const router = express.Router();


//enviamos una peticion hacia una url, en este caso un get a la pagina principal.
//el callback tiene como argumentos request y response.
//request es lo que tu envias
//response es lo que express nos responde
router.get('/', paginaInicio);
// res.json({
//     id:1
// })

router.get('/nosotros', paginaNosotros);

router.get('/viajes', paginaViajes);
router.get('/viajes/:slug', paginaDetalleViaje)

router.get('/testimoniales', paginaTestimoniales);
router.post('/testimoniales', guardarTestimonial);


export default router;