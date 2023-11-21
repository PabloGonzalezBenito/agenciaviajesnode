import {Viaje} from '../models/Viaje.js';
import {Testimonial} from '../models/testimoniales.js';

const paginaInicio = async (req, res) => {
    
    //consultar 3 viajes del modelo Viaje

    //Como queremos hacer 2 consultas a la BBDD, con async await tenemos que esperar a que
    //termine primero una y luego la otra. Si lo hacemos con Promise, se realizaran las dos consultas a la vez y tardará menos.
    const promiseDB = [];
    promiseDB.push(Viaje.findAll({limit:3}));
    promiseDB.push(Testimonial.findAll({limit:3}));
try {
    const resultado = await Promise.all(promiseDB);
    
    res.render('inicio',{
        pagina:'Inicio',
        clase:'home',
        viajes:resultado[0],
        testimoniales:resultado[1]
    })
} catch (error) {
    console.log(error);
}

    res.render('inicio', {
        pagina: 'Inicio',
        clase:'home',
    });
};

const paginaNosotros =  (req, res) => {

    const viajes = "Viaje a Alemania";

    res.render('nosotros', {
        pagina: 'Nosotros',
        viajes
    });
}

const paginaViajes = async (req, res) => {
    //consultar BD
    //el metodo findAll se trae todos los resultados que hay en esa tabla
    const viajes = await Viaje.findAll();
    console.log(viajes);

    res.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes
    });
};

const paginaTestimoniales = async  (req, res) => {

    try {
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });
        
    } catch (error) {
        console.log(error);
    }

};

//Muestra un viaje por su slug
const paginaDetalleViaje = async (req,res) => {
    const { slug } = req.params;
    try {
        const viaje = await Viaje.findOne({where:{slug}});
        res.render('viaje',{
            pagina:`Información Viaje`,
            viaje
        })
    } catch (error) {
        console.error(error);
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}