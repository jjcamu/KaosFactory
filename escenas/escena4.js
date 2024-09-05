import Enemigo from "../clases/Enemigo.js";
import Jugador from "../clases/Jugador.js";  
import Paredes4 from "../clases/Paredes4.js";
import Items4 from "../clases/Items4.js";
import CargarRecursos from "../clases/CargarRecursos.js"
import Martin from "../clases/Martin.js";




export default class escena4 extends Phaser.Scene {

    constructor() {

        super('escena4');

    }

    init (data){  //desde la funcion init() puedo obtener los argumentos ingresados desde la escena anterior
        //Osea, de esta forma puedo pasar datos entre escenas.

        this.jugadorX = 1000
        this.jugadorY = 980
        this.vidasJugador = 250  // por si arranco el juego desde este nivel


        if (data.escenaAnterior == 'escena1'){ 

            this.vidasJugador = data.vidas //conservo las vidas del escenario anterior
            

        }

        this.jugadorElegido = data.jugadorElegido  
    }

    preload(){

        this.recursos = new CargarRecursos (); 

        this.recursos.cargarRecursosComunes(this) 






        //path de referencia desde el cual llamo a los archivos
        this.load.path = './multimedia/';

        //imagen de fondo 
        this.load.image('fondo4', 'imagenes/nivel4/escenario4.png');


        // sprites del escenario

        this.load.image('mesa', 'imagenes/nivel4/mesa.png');
        this.load.image('silla', 'imagenes/nivel4/silla.png');
        this.load.image('sillon', 'imagenes/nivel4/sillon.png');

        this.load.image('globo1a', 'imagenes/nivel2/globo22.png');
        this.load.image('globo2a', 'imagenes/nivel2/globo12.png');
        this.load.image('globo3a', 'imagenes/nivel2/globo22.png');
        this.load.image('globo4a', 'imagenes/nivel2/globo12.png');

        this.load.image('cartelInicial', 'imagenes/nivel1/nuevo-2.jpg')
        this.load.image('cartelFinal', 'imagenes/nivel1/nuevo-2.jpg')

        this.load.image('pantallaFinal', 'imagenes/nivel1/nuevo-2.jpg')
        this.load.image('gameOver', 'imagenes/nivel1/nuevo-2.jpg')
        this.load.image('cartelAdministrativo', 'imagenes/nivel1/nuevo-2.jpg')

        this.load.image('aceptar', 'imagenes/Untitled-2 copy.png')


        //spritesheet del enemigo
 
        this.load.spritesheet('ulla', 'animaciones/ariel/ariel293x272.png', { frameWidth: 293, frameHeight: 272 });
        this.load.spritesheet('esteban', 'animaciones/facu/facu293x272.png', { frameWidth: 293, frameHeight: 272 });
        this.load.spritesheet('martin', 'animaciones/facu/facu293x272.png', { frameWidth: 293, frameHeight: 272 });

        this.load.spritesheet('sobre', 'animaciones/nivel1/leche-1-Sheet.png', { frameWidth: 213, frameHeight: 500 });  




    }

    create(){
        


        this.compUlla = {

            pinia : [0,5] ,
            patada : [6,10] 
        }

        this.compEsteban = {

            pinia : [0,2] ,
            patada : [3,10] 
        }






        ////// imagen de fondo del escenario


        this.fondo = this.add.image(0, 0, 'fondo4').setOrigin(0, 0).setScale(1.5).setDepth(-2);

        //paredes del escenario
        this.paredes4 = new Paredes4(this.physics.world, this);
        this.paredes4.setDepth(-3) 



        ////// enemigos 

        this.enemigoUlla = new Enemigo(this, 400, 500, 'ulla', 2); // las coordenadas del sprite son las del centro del sprite

        this.enemigoEsteban = new Enemigo(this, 1000, 440, 'esteban', 3);

        this.enemigoMartin = new Martin(this, 800, 400, 'martin', 3);


        this.enemigoMartin.cargarTimerMartin(this) //cargo el timer desde el create() de la escena, para que se llame solo una vez
        
            


        this.enemigos = this.physics.add.group([this.enemigoUlla, this.enemigoEsteban, this.enemigoMartin  ])



        /////// crear los elementos que son comunes a todos los escenarios del juego


        this.recursos.crearElementosComunes(this , this.jugadorX, this.jugadorY, this.jugadorElegido)  
        //parametros : la escena (this) , la posicion inicial del jugador y el jugador elegido

        this.jugador.vidas = this.vidasJugador



        //items (elementos del escenario)

        this.items4 = new Items4 (this.physics.world, this);



        ////// colisiones
        
       //colision con los elementos del escenario
        this.physics.add.collider(this.items4,  [this.jugador, this.enemigoUlla, this.enemigoEsteban, this.enemigoMartin] );
 
        //con las paredes
        this.physics.add.collider(this.paredes4,  [this.jugador, this.enemigoUlla, this.enemigoEsteban, this.enemigoMartin] );

        //entre los personajes
        this.physics.add.collider(this.jugador, [this.enemigoUlla, this.enemigoEsteban, this.enemigoMartin ] );
        this.physics.add.collider(this.enemigoUlla,  [this.jugador , this.enemigoEsteban, this.enemigoMartin] );
        this.physics.add.collider(this.enemigoEsteban,  [this.enemigoUlla , this.jugador, this.enemigoMartin ] );
        this.physics.add.collider(this.enemigoMartin,  [this.enemigoUlla , this.enemigoEsteban, this.jugador] );
 

        //choque con los sobres
        //---------this.physics.add.overlap(this.jugador.body, this.carreta.body, this.items3.choqueCarreta, null, this);


        this.banderaDialogo = true  // bandera del dialogo inicial  (true: hay dialogo, false: no hay dialogo)

        this.banderaGlobo1 = true


        this.banderaDialogo2 = true // bandera del dialogo final


        this.banderaCartel = true  //para que no se imprima el cartel en pantalla indefinidamente

    }

    update (){ // ingreso el parametro 'time' , ya que voy a utilizarlo






        // actualizacion del estado del jugador
        this.jugador.actualizar(this.controlJoystick, this.controlTeclado, this.enemigos)



        //// dialogo inicial con martin  -----------------------------------------------------------
        if (this.jugador.y < 800 && this.banderaDialogo == true  ) {

           this.items4.dialogoInicial(this)   

        } else if (this.banderaDialogo == false){

            // comportamiento normal de los enemigos

            this.enemigoMartin.actualizarMartin(this)

            this.enemigoEsteban.actualizar(this.jugador, this.compEsteban)

            this.enemigoUlla.actualizar(this.jugador, this.compUlla)
        }

        // zona empleados administrativos

        if (this.jugador.x >= 1700){

            if  (this.banderaCartel == true){

                this.items4.cartelAdministrativo(this)  

                this.banderaCartel = false

            }

        }else{
            this.banderaCartel = true
        }






        

        //actualizar eje z de los personajes, para dar efecto de profundidad -----------------------------------------------
        //Pero esta vez, teniendo en cuenta la pared diagonal

        this.actualizarProfundidad(this.jugador, [this.enemigoUlla, this.enemigoEsteban, this.enemigoMartin, this.items4.sillon,
        this.items4.mesa, this.items4.silla1, this.items4.silla2])


        if(this.game.input.activePointer.isDown){

            // coordenadas del click en la pantalla
            console.log(this.game.input.mousePointer.x);
            console.log(this.game.input.mousePointer.y);
            console.log('------------------------');
            // coordenadas del click en el mundo del juego
            console.log(this.cameras.main.getWorldPoint(this.game.input.mousePointer.x, this.game.input.mousePointer.y));
            console.log('------------------------');
            }






    }








    //para dar efecto de profundidad, voy variando la propiedad 'depth' de los sprites del escenario segun la posicion de mi jugador

    actualizarProfundidad(jugador, todosLosSprites){


        todosLosSprites.forEach((sprite) => {   // recorro todos los sprites


            if (jugador.body.y > sprite.body.y){ 

                sprite.setDepth(-1);
                // si estoy debajo del sprite, entonces estoy 'delante' del sprite, por eso coloco al sprite detrás
            
            
            } 
            else if (jugador.body.y < sprite.body.y) // en caso contrario
            
            { 
                
                sprite.setDepth(1); // el sprite se colocará delante

                    todosLosSprites.forEach((spriteB) => {  // peroooo debido a que el sprite que se coloque delante del jugador, 
                    //se colocará tambien por delante de los demas sprites, incluso por delante de los que se encuentran mas abajo
                    // en la pantalla (eso no deberia ocurrir), comparo este ultimo sprite (el que coloqué por delante del jugador),
                //con los demas sprites, para colocarlo detrás de los sprites que se encuentren mas abajo en la pantalla que éste.

                        if (spriteB.body.y > sprite.body.y){ 

                            spriteB.setDepth(1);

                        }



                    })
            
            
            
            }




        })

    }

}