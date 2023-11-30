import Jugador from "../clases/Jugador.js";
import Botones from "../clases/Botones.js"
import Paredes from "../clases/Paredes.js";
import Items from "../clases/Items.js";


export default class escena1 extends Phaser.Scene {

    constructor() {

        super('nivel1');

    }

    preload(){

        //path de referencia desde el cual llamo a los archivos
        this.load.path = './multimedia/';

        //imagen de fondo 
        this.load.image('fondo', 'imagenes/nivel1/fondo.png');
    
        //sprites del escenario
        this.load.image('bolsaBasura', 'imagenes/nivel1/fabrica1_bolsabasura.png');
        this.load.image('costadoPorton', 'imagenes/nivel1/fabrica1_costadoporton.png');
        this.load.image('heladera', 'imagenes/nivel1/fabrica1_heladera.png');
        this.load.image('puertaNegocio', 'imagenes/nivel1/fabrica1_puertanegocio.png');
        this.load.image('porton', 'imagenes/nivel1/fabrica1_porton.png');
        this.load.image('heladeraAbierta', 'imagenes/nivel1/fabrica1_heladera_abierta.png')
    
        //botones y palanca (joystick virtual)
        this.load.spritesheet('botonA', 'imagenes/botonA-Sheet100x100.png', { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('botonB', 'imagenes/botonB-Sheet100x100.png', { frameWidth: 100, frameHeight: 100 });
        this.load.image('base', 'imagenes/palanca-base.png')
        this.load.image('bolita', 'imagenes/palanca-bolita.png')
        this.load.image('botonFullScreen', 'imagenes/fullscreen.png');
    
        //animaciones (hojas de sprite)
        this.load.spritesheet('explosion', 'animaciones/nivel1/explosion_012-3-Sheet70x70.png', { frameWidth: 70, frameHeight: 70 });
        this.load.spritesheet('portonRoto', 'animaciones/nivel1/porton_roto0001-Sheet400x300.png', { frameWidth: 400, frameHeight: 300 });
        this.load.spritesheet('leche', 'animaciones/nivel1/leche-1-Sheet.png', { frameWidth: 213, frameHeight: 500 });
        this.load.spritesheet('sombra', 'animaciones/nivel1/sombra0001-1-Sheet.png', { frameWidth: 72, frameHeight: 38 });

        //jugador 
        this.load.spritesheet('jugador', 'animaciones/juan/juan293x272.png', { frameWidth: 293, frameHeight: 272 });
    
        //cargo el plugin del joystick virtual
        this.load.plugin('rexvirtualjoystickplugin', '../rexvirtualjoystickplugin.js', true);


    }

    create(){

        ////// teclado

        this.controlTeclado = this.input.keyboard.createCursorKeys();

        ////// plugin joystick virtual
        this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
            x: 250, y: 650, radius: 100, 
            base: this.add.image(0,0, 'base').setDepth(2), 
            thumb: this.add.image(0,0, 'bolita').setDepth(2)
        });
        
        this.controlJoystick = this.joyStick.createCursorKeys();


        ////// imagen de fondo del escenario

        this.fondo = this.add.image(0, 0, 'fondo').setOrigin(0, 0).setScale(2.2).setDepth(-2);


        ////// items (sprites) con los que puede interactuar el jugador

        this.items = new Items (this.physics.world, this);
        // la clase Items, extiende de 'Phaser.Physics.Arcade.Group', por lo cual es obligatorio pasarle como parametro al menos
        // 'this.physics.world' que es el sistema de fisicas en uso, y 'this' que hace referencia a esta escena.
        // El constructor de 'Phaser.Physics.Arcade.Group' exige esos dos parametros para poder instanciarse.


        ////// jugador

        this.jugador = new Jugador(this, 400, 600, 'jugador');


        
        ////// botones 
        
        this.botones = new Botones(this, 1500,750, 'botonA', 1700,550, 'botonB', this.jugador);
        


        ////// paredes del escenario

        this.paredes = new Paredes(this.physics.world, this);


        ////// colisiones

        this.physics.add.collider(this.jugador, this.paredes);

        this.physics.add.collider(this.jugador, this.items.costadoPorton);

        this.physics.add.collider(this.items.bolsaBasura, this.jugador ); 
        //colision, choque entre el objeto y el body del jugador
        this.physics.add.overlap( this.items.bolsaBasura, [this.jugador.hitboxPinia, this.jugador.hitboxPatada], this.items.golpe, null, this);
        //superposicion entre el objeto y el hitbox del golpe del jugador. En caso de que exista superposicion, se llama a la 
        //funcion 'golpe', que recibirá 2 parametros, el objeto golpeado, y el hitbox con el que se superpuso.

        this.physics.add.collider(this.items.porton, this.jugador );
        this.physics.add.overlap( this.items.porton, [this.jugador.hitboxPinia, this.jugador.hitboxPatada], this.items.golpe, null, this);

        this.physics.add.collider(this.items.heladera, this.jugador );
        this.physics.add.overlap( this.items.heladera, [this.jugador.hitboxPinia, this.jugador.hitboxPatada], this.items.golpe, null, this);

        //toma la lechita

        this.physics.add.overlap(this.jugador, this.items.sombra , this.items.tomaLechita, null, this)
        //en el ultimo parametro , le estoy pasando a la funcion 'tomaLechita()' el contexto this (en este caso la escena),
        //para poder utilizarlo en la funcion.
       



    }

    update (){

        this.jugador.actualizar(this.controlJoystick, this.controlTeclado)

        //para dar efecto de profundidad, voy variando la propiedad 'depth' de los sprites del escenario segun la posicion 
        //de mi jugador
        this.items.actualizarProfundidad(this.jugador)

        //console.log(this.jugador.anims.getFrameName() )



        if(this.game.input.activePointer.isDown){
            console.log(this.input.mousePointer.worldX);
            console.log(this.input.mousePointer.worldY);
            }
    

    }



}