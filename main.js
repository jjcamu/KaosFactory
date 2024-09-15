//Desde este script , se configura phaser, se invocan las escenas cargadas, y se crea el objeto phaser (se inicia el juego)

//importo las escenas creadas
import intro from './escenas/intro.js'
import escena1 from './escenas/escena1.js'
import escena2 from './escenas/escena2.js'
import escena3 from './escenas/escena3.js'
import escena4 from './escenas/escena4.js'

//defino la configuracion del juego

var config = {

    // OPCIONAL
    title: 'Factory Assault',
    version: '0.1',



    type:Phaser.WEBGL, //la propiedad 'type' indica el renderizador a utilizar, en este caso será 'Phaser.AUTO'
    //en mi notebook, funciona mejor Phaser.CANVAS   //existen Phaser.CANVAS, Phaser.WEBGL y Phaser.AUTO
    scale: {
        mode:Phaser.Scale.FIT, // escalar automaticamente adaptandose a la pantalla
        autoCenter:Phaser.Scale.CENTER_BOTH, // centrar automaticamente en la pantalla
        width:1920, // ancho de pantalla  1920
        height:900,// alto de pantalla    900
    },
    physics : {
        default:"arcade", // tipo de fisica que va a utilizar 
        arcade: {
            gravity: { y :0},// gravedad en el eje 'Y' igual a cero, para que los objetos no se "caigan"
            debug: false // en true: propiedad que me ayuda en el desarrollo del juego (me muestra los hitboxes,
                        // la direccion en la que se aplica una fuerza, etc)
        }
    },
    input: {
        activePointers: 3  //para que el celu reconozca mas de un touch simultaneo
    },

    //ESCENAS DEL JUEGO
    scene: [intro, escena1, escena2, escena3, escena4]  //añado las escenas importadas, por medio de un array con todas las escenas


}





//ACA SE CREA EL JUEGO
//creo una instancia del juego ( un objeto Phaser.Game) ingresando la configuracion definida 
var juego = new Phaser.Game(config); 

