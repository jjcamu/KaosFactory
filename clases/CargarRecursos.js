import Jugador from "../clases/Jugador.js";
import Botones from "../clases/Botones.js"
import BarrasVida from "../clases/BarrasVida.js";


export default class CargarRecursos  {  // cargo los recursos comunes a todos los escenarios del juego


    constructor() {


    }


    cargarRecursosComunes(escena){




        //path de referencia desde el cual llamo a los archivos
        escena.load.path = './multimedia/';

        //botones y palanca (joystick virtual)
        escena.load.spritesheet('botonA', 'imagenes/botonA-Sheet100x100.png', { frameWidth: 100, frameHeight: 100 });
        escena.load.spritesheet('botonB', 'imagenes/botonB-Sheet100x100.png', { frameWidth: 100, frameHeight: 100 });
        escena.load.image('base', 'imagenes/palanca-base.png')
        escena.load.image('bolita', 'imagenes/palanca-bolita.png')
        escena.load.image('botonFullScreen', 'imagenes/fullscreen.png');
        escena.load.image('llaveNegocio', 'imagenes/llave.png');

        // cartel de GameOver
        escena.load.image('gameOverPerdiste', 'imagenes/gameover.png');
        


        //posibles spritesheet del jugador

        escena.load.spritesheet('juan', 'animaciones/ariel/ariel293x272.png', { frameWidth: 293, frameHeight: 272 });
        escena.load.spritesheet('ariel', 'animaciones/ariel/ariel293x272.png', { frameWidth: 293, frameHeight: 272 });
        escena.load.spritesheet('ulises', 'animaciones/facu/facu293x272.png', { frameWidth: 293, frameHeight: 272 });
        escena.load.spritesheet('diego', 'animaciones/diego/diego293x272.png', { frameWidth: 293, frameHeight: 272 });
        escena.load.spritesheet('nico', 'animaciones/facu/facu293x272.png', { frameWidth: 293, frameHeight: 272 });
 
        //spritesheet de los nombres de los peleadores
        escena.load.spritesheet('nombresPeleadores', 'imagenes/nombres87x18.png', { frameWidth: 87, frameHeight: 18 });

        //barra de energia
        escena.load.image('barra', 'imagenes/vidas.png')

        //cargo el plugin del joystick virtual
        escena.load.plugin('rexvirtualjoystickplugin', '../rexvirtualjoystickplugin.js', true);
                //el primer parametro es un id que ya viene asignado,y el segundo es la ruta (url)donde se halla el plugin.




    }






    crearElementosComunes(escena, jugadorX, jugadorY, spriteSheet){




        ////// teclado

        escena.controlTeclado = escena.input.keyboard.createCursorKeys(); //convierto mi teclado en un control 
        //que genera eventos. Posteriormente podré asociar estos eventos a los movimientos de mi jugador




        ////// plugin joystick virtual

        escena.joyStick = escena.plugins.get('rexvirtualjoystickplugin').add(escena, {
             x: 250, y: 650, radius: 200, 
            base: escena.add.image(0, 0, 'base').setDepth(3).setScale(1.1),
            thumb: escena.add.image(0, 0, 'bolita').setDepth(3).setScale(1.2),

        });

        escena.controlJoystick = escena.joyStick.createCursorKeys();
        //tambien convierto mi joystick virtual en un control que genera eventos

        


        //BOTON FULLSCREEN--------------------------------------------------------------------------------------------

        escena.botonFull = escena.add.image(1806, 100, "botonFullScreen");// agregamos la imagen del boton
        escena.botonFull.depth = 3;//(depth: profundidad en el eje z)(z-index) ubico el boton en el nivel 1, osea por encima de
        //los demas gameobjects.
        escena.botonFull.alpha = 0.5; // (transparencia) disminuyo su alfa a 0.5 (el rango debe ser entre 0 y 1)

        escena.botonFull.setScrollFactor(0)  //fija en la pantalla el 'botonFull' (no se mueve cuando muevo mi jugador)

        escena.botonFull.setInteractive().on("pointerdown", function () {
            //'setInteractive()' vuelve clickeable (interactiva) a la imagen del boton.
            //'on()' define que funcion se ejecutará al interactuar con el boton .
            // "pointerdown" indica el evento que se espera para ejecutar la funcion.

            if (escena.scale.isFullscreen == false) {
                escena.scale.startFullscreen(); //pasar a pantalla completa
            }
            else {
                escena.scale.stopFullscreen(); //salir de pantalla completa

            }

        })




        ///////  barra de energia y nombre de los peleadores  
        escena.barrasVida = new BarrasVida(escena);


        ////// jugador


        switch (spriteSheet) {
            case "juan":
                this.indice = 1
                break;
            case "ariel":
                this.indice = 2
                break;
            case "ulises":
                this.indice = 3
                break;
            case "diego":
                this.indice = 3
                break;
            case "nico":
                this.indice = 2
                break;
        }

        //instancio un objeto llamado 'jugador' de la clase Jugador, que extiende (hereda) de la clase 'Sprite'
        escena.jugador = new Jugador(escena, jugadorX, jugadorY, spriteSheet, this.indice);  



        ////// botones 
        
        // la clase Botones, extiende de Phaser.GameObjects.Group, osea es un grupo de sprites sin fisicas (osea,
        //  no colisionan ni caen)
        escena.botones = new Botones(escena, 1500,750, 'botonA', 1700,550, 'botonB', escena.jugador);


        // indicador llave del negocio

        if (escena.llaveNegocio == true){

            this.iconoLLave = escena.add.image(1800, 250, 'llaveNegocio').setScale(0.5).setDepth(3).setScrollFactor(0) 
            // 'setScrollFactor(0) ' es para que la imagen quede anclada en la pantalla, y siga al jugador
        }



        if (escena.escenaAnterior){  //si existe una escena anterior

            escena.scene.stop(escena.escenaAnterior);  // la freno (creo que me ayuda a liberar memoria)

        }
 


        //
    }




}