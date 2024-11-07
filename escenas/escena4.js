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

        this.escala = 0.5


    }

    preload(){



        this.recursos = new CargarRecursos (); 

        this.recursos.cargarRecursosComunes(this) 






        //path de referencia desde el cual llamo a los archivos
        this.load.path = './multimedia/';

        //imagen de fondo 
        this.load.image('fondo4', 'imagenes/nivel4/escenario4B.png');


        // sprites del escenario

        this.load.image('mesa', 'imagenes/nivel4/mesa.png');
        this.load.image('silla', 'imagenes/nivel4/silla.png');
        this.load.image('sillon', 'imagenes/nivel4/sillon.png');

        this.load.image('globo1a', 'imagenes/nivel4/globo1.png');
        this.load.image('globo2a', 'imagenes/nivel4/globo2.png');
        this.load.image('globo3a', 'imagenes/nivel4/globo3.png');
        this.load.image('globo4a', 'imagenes/nivel4/globo4.png');

        this.load.image('cartelInicial2', 'imagenes/nivel4/cartelInicial.png')
        this.load.image('cartelFinal', 'imagenes/nivel4/cartelFinal.png')

        this.load.image('pantallaFinal', 'imagenes/nivel4/pantallaFinal.png')
        this.load.image('cartelAdministrativo', 'imagenes/nivel4/cartelOficina.png')

        this.load.image('aceptar', 'imagenes/Untitled-2 copy.png')

        this.load.image('copa', 'imagenes/nivel4/copa.png');
        this.load.image('titulo1', 'imagenes/nivel4/titulo1.png');
        this.load.image('titulo2', 'imagenes/nivel4/titulo2.png');
        this.load.image('titulo3', 'imagenes/nivel4/titulo3.png');
        this.load.image('creditos', 'imagenes/nivel4/creditos.png');
        this.load.image('confeti', 'imagenes/nivel4/confeti.png');


        //spritesheets
 
        this.load.spritesheet('ulla', 'animaciones/ulla/ulla303x295.png', { frameWidth: 303, frameHeight: 295 });
        this.load.spritesheet('esteban', 'animaciones/esteban/esteban298x279.png', { frameWidth: 298, frameHeight: 279 });
        this.load.spritesheet('martin', 'animaciones/martin/martin296x291.png', { frameWidth: 296, frameHeight: 291 });

        this.load.spritesheet('sobre', 'animaciones/nivel4/sobre-sheet500x500.png', { frameWidth: 500, frameHeight: 500 });  
        //this.load.spritesheet('explosion', 'animaciones/nivel2/explosion200x200.png', { frameWidth: 200, frameHeight: 200 });

        // musica del escenario

        this.load.audio('musicaNivel4', 'audios/musicaNiveles/musicaNivel4.mp3' )

        //this.load.audio('musicaVictoria', 'audios/musicaNiveles/musicaVictoria.mp3' )

        //this.load.audio('marchaPeroncha', 'audios/musicaNiveles/marchaPeroncha.mp3' )


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



        this.physics.world.setFPS(120);//establezco cuadros por segundo a 120 .
        //Esto, y ademas establecer un factor de rebote de 1 en el enemigo, sirve para asegurarme que el cuerpo del enemigo 
        //no atraviese las paredes (las areas de colision)
  
        this.events.on('shutdown', () => { this.sound.stopAll() }) //frena la musica si se sale del escenario (para evitar errores de audio)

        ////// imagen de fondo del escenario


        this.fondo = this.add.image(0, 0, 'fondo4').setOrigin(0, 0).setScale(3).setDepth(-2);

        //paredes del escenario
        this.paredes4 = new Paredes4(this.physics.world, this);
        this.paredes4.setDepth(-3) 



        ////// enemigos 

        this.enemigoUlla = new Enemigo(this, 400, 500, 'ulla', 11); // las coordenadas del sprite son las del centro del sprite

        this.enemigoEsteban = new Enemigo(this, 1000, 440, 'esteban', 10);

        this.enemigoMartin = new Martin(this, 800, 400, 'martin', 12);


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

        this.banderaConfeti = false


        this.sound.play('musicaNivel4' , { volume: 0.5 , loop: true })

    




        this.children.list.forEach(GameObject => {


            if (GameObject instanceof Phaser.GameObjects.Sprite  ||  GameObject instanceof Phaser.GameObjects.Image  ){
                
                GameObject.displayWidth =  GameObject.displayWidth * this.escala
                GameObject.displayHeight =  GameObject.displayHeight * this.escala


            GameObject.x =  GameObject.x * this.escala
            GameObject.y =  GameObject.y * this.escala

            if (GameObject.body){


                GameObject.body.x =  GameObject.body.x * this.escala
                GameObject.body.y =  GameObject.body.y * this.escala

                GameObject.body.width =  GameObject.body.width * this.escala
                GameObject.body.height =  GameObject.body.height * this.escala
            

            }

        }
        })

    }

    update (){ // ingreso el parametro 'time' , ya que voy a utilizarlo






        // actualizacion del estado del jugador
        this.jugador.actualizar(this.controlJoystick, this.controlTeclado, this.enemigos)



        //// dialogo inicial con martin  -----------------------------------------------------------
        if (this.jugador.y < 800 * this.escala && this.banderaDialogo == true  ) {

           this.items4.dialogoInicial(this)   


        } else if (this.banderaDialogo == false){

            // comportamiento normal de los enemigos

            this.enemigoMartin.actualizarMartin(this)

            this.enemigoEsteban.actualizar(this.jugador, this.compEsteban)

            this.enemigoUlla.actualizar(this.jugador, this.compUlla)
        }

        // zona empleados administrativos

        if (this.jugador.x >= 1700 * this.escala){

            if  (this.banderaCartel == true){

                this.items4.cartelAdministrativo(this)  

                this.sound.play('advertencia', { volume: 1 })

                this.banderaCartel = false

            }

        }else{
            //this.banderaCartel = true   // Anulé esta linea para que no vuelva a imprimir el cartel en pantalla
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