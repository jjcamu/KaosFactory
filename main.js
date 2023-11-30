//Desde este script , se configura phaser, se invocan las escenas cargadas, y se crea el objeto phaser (se inicia el juego)

//importo las escenas creadas
import escena1 from './escenas/escena1.js'


//defino la configuracion del juego

var config = {
    type:Phaser.CANVAS, //la propiedad 'type' indica el renderizador a utilizar, en este caso será 'Phaser.AUTO'
    //en mi notebook, funciona mejor Phaser.CANVAS
    scale: {
        mode:Phaser.Scale.FIT, // escalar automaticamente adaptandose a la pantalla
        autoCenter:Phaser.Scale.CENTER_BOTH, // centrar automaticamente en la pantalla
        width:1920, // ancho de pantalla
        height:900,// alto de pantalla
    },
    physics : {
        default:"arcade", // tipo de fisica que va a utilizar 
        arcade: {
            gravity: { y :0},// gravedad en el eje 'Y' igual a cero, para que los objetos no se "caigan"
            debug: true // en true: propiedad que me ayuda en el desarrollo del juego (me muestra los hitboxes,
                        // la direccion en la que se aplica una fuerza, etc)
        }
    },
    input: {
        activePointers: 3  //para que el celu reconozca mas de un touch simultaneo
    },



    scene: [escena1]  //añado las escenas importadas, por medio de un array con todas las escenas


}






//creo un objeto Phaser.Game ingresando la configuracion definida, y lo guardo 
//en la variable juego(acá se crea el juego)
var juego = new Phaser.Game(config); 

