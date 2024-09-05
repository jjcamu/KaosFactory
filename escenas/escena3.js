import Enemigo from "../clases/Enemigo.js";
import Jugador from "../clases/Jugador.js";  
import Paredes3 from "../clases/Paredes3.js";
import Items3 from "../clases/Items3.js";
import CargarRecursos from "../clases/CargarRecursos.js"




export default class escena3 extends Phaser.Scene {

    constructor() {

        super('escena3');

    }

    init (data){  //desde la funcion init() puedo obtener los argumentos ingresados desde la escena anterior
        //Osea, de esta forma puedo pasar datos entre escenas.

        this.jugadorX = 700
        this.jugadorY = 860
        this.vidasJugador = 250  // por si arranco el juego desde este nivel


        if (data.escenaAnterior == 'escena2'){ 

            this.vidasJugador = data.vidas //conservo las vidas del escenario anterior
            

        }

        this.jugadorElegido = data.jugadorElegido  

        this.llaveNegocio = data.llaveNegocio
    }

    preload(){

        this.recursos = new CargarRecursos ();  //==========================================>>>>

        this.recursos.cargarRecursosComunes(this)  //========================================>>>> ESTO LO PUSE PARA ARRANCAR DEL NIVEL3






        //path de referencia desde el cual llamo a los archivos
        this.load.path = './multimedia/';

        //imagen de fondo 
        this.load.image('fondo3', 'imagenes/nivel3/escenario3.png');


        // sprites del escenario

        this.load.image('paredA', 'imagenes/nivel3/paredEnvasadoA.png');
        this.load.image('paredB', 'imagenes/nivel3/paredEnvasadoB.png');
        this.load.image('paredC', 'imagenes/nivel3/paredEnvasadoC.png');
         this.load.image('paredEnvasado2', 'imagenes/nivel3/paredEnvasado2.png');
        this.load.image('vidrio1', 'imagenes/nivel3/vidrioVentana.png');
        this.load.image('vidrio2', 'imagenes/nivel3/vidrioVentana4.png');
        this.load.image('vidrio3', 'imagenes/nivel3/vidrioVentana3.png');

        this.load.image('carreta', 'imagenes/nivel2/carro.png');

        
        this.load.image('mesa1', 'imagenes/nivel3/mesa1.png');
        this.load.image('mesa2', 'imagenes/nivel3/mesa2.png');


        //spritesheet del enemigo
/* 
        this.load.spritesheet('juan', 'animaciones/ariel/ariel293x272.png', { frameWidth: 293, frameHeight: 272 });
        this.load.spritesheet('ulises', 'animaciones/facu/facu293x272.png', { frameWidth: 293, frameHeight: 272 });
        this.load.spritesheet('nico', 'animaciones/facu/facu293x272.png', { frameWidth: 293, frameHeight: 272 });
        this.load.spritesheet('diego', 'animaciones/diego/diego293x272.png', { frameWidth: 293, frameHeight: 272 }); */

        this.load.spritesheet('llave', 'animaciones/nivel3/llave500x500.png', { frameWidth: 500, frameHeight: 500 });
        this.load.spritesheet('sombra', 'animaciones/nivel3/sombra0001-1-Sheet.png', { frameWidth: 72, frameHeight: 38 });





    }

    create(){
        


        this.compJuan = {

            pinia : [0,5] ,
            patada : [6,10] 
        }

        this.compUlises = {

            pinia : [0,2] ,
            patada : [3,10] 
        }

        this.compNico = {

            pinia : [0,2] ,
            patada : [3,10] 
        }

        this.compDiego = {

            pinia : [0,2] ,
            patada : [3,10] 
        }




        ////// imagen de fondo del escenario


        this.fondo = this.add.image(0, 0, 'fondo3').setOrigin(0, 0).setScale(1.3).setDepth(-2);


        ////// paredes del escenario
        this.paredes3 = new Paredes3(this.physics.world, this);
        this.paredes3.setDepth(-3)



        ////// enemigos 

        //esta declaracion inicial la hago para evitar errores con las funciones que trabajan con los cuerpos de los sprites 
        // ej: this.physics.add.group(), debido a un error en la logica de mi programacion :(

        this.enemigoJuan = new Enemigo(this, 0, -200, 'juan', 1)

        this.enemigoUlises  = new Enemigo(this, 0, -200, 'juan', 3)

        this.enemigoNico  = new Enemigo(this, 0, -200, 'juan', 3)
      
        this.enemigoDiego  = new Enemigo(this, 0, -200, 'juan', 3)



        // aparicion de cada enemigo en el escenario, según el jugador seleccionado

        if (!(this.jugadorElegido == 'ariel' || this.jugadorElegido == 'juan'))  {
            //si el jugador elegido NO es Ariel ni Juan , entonces agrego el enemigo Juan al escenario.

            this.enemigoJuan = new Enemigo(this, 2710, 1570, 'juan', 1); // las coordenadas son las del centro del sprite

        }

        if (this.jugadorElegido != 'ulises'){

            this.enemigoUlises = new Enemigo(this, 2670, 800, 'ulises', 3);

            if (this.jugadorElegido != 'nico'){

                this.enemigoNico = new Enemigo(this, 3500, 770, 'nico', 3);
            }

        }else{  // si el jugador elegido es Ulises, entonces No agrego al enemigo Ulises, 
            //y el enemigo Nico reemplazará al enemigo Ulises (Nico será quien arroje la carreta)

            this.enemigoNico = new Enemigo(this, 2670, 800, 'nico', 3);

        }


        if (this.jugadorElegido != 'diego'){

            this.enemigoDiego = new Enemigo(this, 3720, 610, 'diego', 3);

        }

        

        this.enemigos = this.physics.add.group([this.enemigoJuan, this.enemigoUlises, this.enemigoNico, this.enemigoDiego  ])



        /////// crear los elementos que son comunes a todos los escenarios del juego

        this.recursos = new CargarRecursos (); //instancio un objeto de esta clase, solo para usar su metodo 'crearElementosComunes'

        this.recursos.crearElementosComunes(this , this.jugadorX, this.jugadorY, this.jugadorElegido)  
        //parametros : la escena (this) , la posicion inicial del jugador y el jugador elegido

        this.jugador.vidas = this.vidasJugador



        ////// items (elementos del escenario)

        this.items3 = new Items3 (this.physics.world, this);



        ////// colisiones
        
       //colision con los elementos del escenario
        this.physics.add.collider(this.items3,  [this.jugador, this.enemigoJuan , this.enemigoUlises, this.enemigoNico, this.enemigoDiego] );
 
        //con las paredes
        this.physics.add.collider(this.paredes3,  [this.jugador, this.enemigoJuan , this.enemigoUlises, this.enemigoNico, this.enemigoDiego] );

        //entre los personajes
        this.physics.add.collider(this.jugador, [this.enemigoJuan , this.enemigoUlises, this.enemigoNico, this.enemigoDiego ] );
        this.physics.add.collider(this.enemigoJuan,  [this.jugador , this.enemigoUlises, this.enemigoNico, this.enemigoDiego] );
        this.physics.add.collider(this.enemigoUlises,  [this.enemigoJuan , this.jugador, this.enemigoNico, this.enemigoDiego ] );
        this.physics.add.collider(this.enemigoNico,  [this.enemigoJuan , this.enemigoUlises, this.jugador, this.enemigoDiego] );
        this.physics.add.collider(this.enemigoDiego ,  [this.enemigoJuan , this.enemigoUlises, this.enemigoNico, this.jugador ] );

        //choque con la carreta
        this.physics.add.overlap(this.jugador.body, this.carreta.body, this.items3.choqueCarreta, null, this);



        this.banderaCarreta = true  // para que llame a la funcion de lanzaCarreta una sola vez

        this.banderaChoque = true // para que dañe al jugador solo una vez

        this.banderaDiegoCelu = true

        this.banderaLlave = true

    }

    update (){ // ingreso el parametro 'time' , ya que voy a utilizarlo






        // actualizacion del estado del jugador
        this.jugador.actualizar(this.controlJoystick, this.controlTeclado, this.enemigos)



        // actualizacion del comportamiento de los enemigos
         this.enemigoJuan.actualizar(this.jugador, this.compJuan)

        this.enemigoUlises.actualizar(this.jugador, this.compUlises)

        this.enemigoNico.actualizar(this.jugador, this.compNico) 

        if (this.banderaDiegoCelu == false){ //cuando diego deje de mirar el celu, peleará

            this.enemigoDiego.actualizar(this.jugador, this.compDiego)
            
        }

        





        //colision con las paredes diagonales  ------------------------------------------------------------------------------

        this.items3.colisionParedDiagonal([this.jugador, this.enemigoJuan, this.enemigoUlises, this.enemigoNico, this.enemigoDiego], this.items3.poligono1)

        this.items3.colisionParedDiagonal([this.jugador, this.enemigoJuan, this.enemigoUlises, this.enemigoNico, this.enemigoDiego], this.items3.poligono2)


        // lanzamiento de carreta --------------------------------------------------------

        if (this.jugador.x > 1680 && this.banderaCarreta == true ) { //ingresa a este condicional solo una vez

            this.items3.lanzaCarreta(this)   
 
        }

        // diego mirando el celu --------------------------------------------------------

        if (this.jugador.x < 3480 && this.banderaDiegoCelu == true) { //diego esta con el celu

            this.enemigoDiego.anims.play("diegoCelu", true);  
            this.enemigoDiego.setFlipX(true)
        }else{
            this.banderaDiegoCelu = false  // diego deja de estar con el celu
        }


        // llave de diego (o nico) ------------------------------------------------------------------


        if (this.jugadorElegido != 'diego' && this.enemigoDiego.state == 'muerto' && this.banderaLlave == true){
            //si el jugador elegido No es Diego, la llave la tendrá Diego

            this.items3.mostrarLlave(this)

        } else if (this.jugadorElegido == 'diego' && this.enemigoNico.state == 'muerto' && this.banderaLlave == true){
            //si el jugador elegido Es Diego, la llave la tendrá Nico

            this.items3.mostrarLlave(this)
        }

        if (this.items3.llave){

            this.physics.world.overlap(this.jugador.hitboxCuerpo.body ,this.items3.llave ,  (jugador, llave) => {llave.destroy(); this.llaveNegocio = true; this.items3.sombra.destroy()});
        }


        if (this.llaveNegocio == true){

            this.add.image(1800, 250, 'llaveNegocio').setScale(0.5).setDepth(3).setScrollFactor(0) 
            // 'setScrollFactor(0) ' es para que la imagen quede anclada en la pantalla, y siga al jugador
        }



        

        //actualizar eje z de los personajes, para dar efecto de profundidad -----------------------------------------------
        //Pero esta vez, teniendo en cuenta la pared diagonal

        this.actualizarProfundidad(this.jugador, [this.enemigoJuan, this.enemigoUlises, this.enemigoNico, this.enemigoDiego, 
        this.items3.paredC, this.items3.paredEnvasado2, this.items3.vidrio1, this.items3.vidrio1b, this.items3.vidrio3, this.carreta,
    ])


        if(this.game.input.activePointer.isDown){

            // coordenadas del click en la pantalla
            console.log(this.game.input.mousePointer.x);
            console.log(this.game.input.mousePointer.y);
            console.log('------------------------');
            // coordenadas del click en el mundo del juego
            console.log(this.cameras.main.getWorldPoint(this.game.input.mousePointer.x, this.game.input.mousePointer.y));
            console.log('------------------------');
            }


        //vuelve a la escena 2 ------------------------------------------------------------------------    

        if (this.jugador.x < 650   ){

            this.scene.start('escena2',  { vidas: this.jugador.vidas , escenaAnterior: this.scene.key , jugadorElegido: this.jugadorElegido, llaveNegocio: this.llaveNegocio })

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