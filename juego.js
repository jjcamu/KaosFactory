

//defino la configuracion del juego

var config = {
    type:Phaser.AUTO, //la propiedad 'type' indica el renderizador a utilizar, en este caso será 'Phaser.AUTO'
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



    scene: [escena1]  //array con todas las escenas del juego (el nombre de la escena debe coincidir con
    // el archivo .js que la contiene)

}


//variables globales a utilizar en todos los niveles:

var jugador; //acá guardare el sprite de mi jugador

var fondo;

var paredes;

var escala; //para escalar las imagenes, sprites y hitbox del juego

var controlJoystick; //acá el control del joystick

var controlTeclado;



//creo un objeto Phaser.Game ingresando la configuracion definida, y lo guardo 
//en la variable juego(acá se crea el juego)
var juego = new Phaser.Game(config); 

