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

        this.escala = 0.5
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

        
        //this.load.image('mesa1', 'imagenes/nivel3/mesa1.png');
        this.load.image('mesa2', 'imagenes/nivel3/mesa2.png');
        this.load.image('mesa3', 'imagenes/nivel3/mesa3.png');
        this.load.image('mezcladora', 'imagenes/nivel3/mezcladora.png');
        this.load.image('amasadora', 'imagenes/nivel3/amasadora.png');
        this.load.image('cinta', 'imagenes/nivel3/cinta.png');
        this.load.image('enfriadora', 'imagenes/nivel3/enfriadora.png');
        this.load.image('enroladora', 'imagenes/nivel3/enroladora.png');
        this.load.image('envasadora', 'imagenes/nivel3/envasadora.png');
        this.load.image('maquina1', 'imagenes/nivel3/maquina1.png');
        this.load.image('maquina2', 'imagenes/nivel3/maquina2.png');
        this.load.image('molde', 'imagenes/nivel3/molde.png');
        this.load.image('moledora', 'imagenes/nivel3/moledora.png');
        this.load.image('pailaCobre', 'imagenes/nivel3/pailaCobre.png');
        this.load.image('tablero', 'imagenes/nivel3/tablero.png');
        this.load.image('tachoBasura', 'imagenes/nivel3/tachoBasura.png');
        this.load.image('tarimaAzucar', 'imagenes/nivel3/tarimaAzucar.png');
        this.load.image('tarimaEsencias', 'imagenes/nivel3/tarimaEsencias.png');



        //spritesheet del enemigo
/* 
        this.load.spritesheet('juan', 'animaciones/ariel/ariel293x272.png', { frameWidth: 293, frameHeight: 272 });
        this.load.spritesheet('ulises', 'animaciones/facu/facu293x272.png', { frameWidth: 293, frameHeight: 272 });
        this.load.spritesheet('nico', 'animaciones/facu/facu293x272.png', { frameWidth: 293, frameHeight: 272 });
        this.load.spritesheet('diego', 'animaciones/diego/diego293x272.png', { frameWidth: 293, frameHeight: 272 }); */

        this.load.spritesheet('llave', 'animaciones/nivel3/llave500x500.png', { frameWidth: 500, frameHeight: 500 });
        this.load.spritesheet('sombra', 'animaciones/nivel3/sombra0001-1-Sheet.png', { frameWidth: 72, frameHeight: 38 });

        this.load.spritesheet('mate', 'animaciones/nivel3/mate-sheet500x800.png', { frameWidth: 500, frameHeight: 800 });
        this.load.spritesheet('caramelos', 'animaciones/nivel3/caramelos-sheet400x500.png', { frameWidth: 400, frameHeight: 500 });

        this.load.spritesheet('explosion', 'animaciones/nivel2/explosion200x200.png', { frameWidth: 200, frameHeight: 200 });

        //audios del escenario

        this.load.audio('musicaNivel12y3', 'audios/musicaNiveles/musicaNivel12y3.mp3' )
        this.load.audio('tomaMate', 'audios/sonidos/tomaMate.ogg' )
        this.load.audio('llave', 'audios/sonidos/llave.ogg' )
        this.load.audio('golpeCarreta', 'audios/sonidos/golpeCarreta.ogg' )




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

        this.physics.world.setFPS(120);//establezco cuadros por segundo a 120 .
        //Esto, y ademas establecer un factor de rebote de 1 en el enemigo, sirve para asegurarme que el cuerpo del enemigo 
        //no atraviese las paredes (las areas de colision)


        this.events.on('shutdown', () => { this.sound.stopAll() }) //frena la musica si se sale del escenario (para evitar errores de audio)


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

            this.enemigoJuan = new Enemigo(this, 2710, 1400, 'juan', 1); // las coordenadas son las del centro del sprite

        }

        if (this.jugadorElegido != 'ulises'){

            this.enemigoUlises = new Enemigo(this, 2670, 800, 'ulises', 3);

            if (this.jugadorElegido != 'nico'){

                this.enemigoNico = new Enemigo(this, 3160, 927, 'nico', 3);
            }

        }else{  // si el jugador elegido es Ulises, entonces No agrego al enemigo Ulises, 
            //y el enemigo Nico reemplazará al enemigo Ulises (Nico será quien arroje la carreta)

            this.enemigoNico = new Enemigo(this, 2670, 800, 'nico', 3);

        }


        if (this.jugadorElegido != 'diego'){

            this.enemigoDiego = new Enemigo(this, 3759, 560, 'diego', 3);

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
        this.physics.add.collider(this.items3,  [this.jugador, this.enemigoJuan , this.enemigoUlises, this.enemigoNico, this.enemigoDiego, this.items3.tachoBasura] );
 
        //con las paredes
        this.physics.add.collider(this.paredes3,  [this.jugador, this.enemigoJuan , this.enemigoUlises, this.enemigoNico, this.enemigoDiego, this.items3.tachoBasura] );

        //entre los personajes
        this.physics.add.collider(this.jugador, [this.enemigoJuan , this.enemigoUlises, this.enemigoNico, this.enemigoDiego ] );
        this.physics.add.collider(this.enemigoJuan,  [this.jugador , this.enemigoUlises, this.enemigoNico, this.enemigoDiego] );
        this.physics.add.collider(this.enemigoUlises,  [this.enemigoJuan , this.jugador, this.enemigoNico, this.enemigoDiego ] );
        this.physics.add.collider(this.enemigoNico,  [this.enemigoJuan , this.enemigoUlises, this.jugador, this.enemigoDiego] );
        this.physics.add.collider(this.enemigoDiego ,  [this.enemigoJuan , this.enemigoUlises, this.enemigoNico, this.jugador ] );

        //choque de la carreta con el jugador
        this.physics.add.overlap(this.jugador.body, this.carreta.body, this.items3.choqueCarreta, null, this);


        //choque de la carreta con las paredes o las maquinas
        this.physics.add.overlap(this.carreta.body, [this.items3, this.paredes3] ,  (carreta, paredes) => {
            carreta.body.setEnable(false); 
            carreta.setVisible(false);
            this.sound.play('explosion', { volume: 8 })

            // muestro la animacion de explosion .  
            this.explosion = this.add.sprite(carreta.x ,carreta.y  , 'explosion').setScale(1.8 * this.escala);
            this.explosion.anims.play("explosion");
       
        });


        // toma mate
        this.physics.add.overlap( this.items3.mate , [this.jugador.hitboxPinia, this.jugador.hitboxCuerpo], this.items3.tomaMate, null, this)
        
        // come caramelos
        this.physics.add.overlap( this.items3.caramelos , [this.jugador.hitboxPinia, this.jugador.hitboxCuerpo], this.items3.comeCaramelos, null, this)






        this.banderaCarreta = true  // para que llame a la funcion de lanzaCarreta una sola vez

        this.banderaChoque = true // para que dañe al jugador solo una vez

        this.banderaDiegoCelu = true

        this.banderaLlave = true



        // reproduzco la musica del nivel
        this.sound.play('musicaNivel12y3' , { volume: 0.5 , loop: true  })


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



        // actualizacion del comportamiento de los enemigos
        this.enemigoJuan.actualizar(this.jugador, this.compJuan)

        this.enemigoUlises.actualizar(this.jugador, this.compUlises)

        this.enemigoNico.actualizar(this.jugador, this.compNico) 

        if (this.banderaDiegoCelu == false){ //cuando diego deje de mirar el celu, peleará

            this.enemigoDiego.actualizar(this.jugador, this.compDiego)
            
        }

        


/*         //colision con las paredes diagonales  ------------------------------------------------------------------------------

            this.items3.colisionParedDiagonal([this.jugador, this.enemigoJuan, this.enemigoUlises, this.enemigoNico, this.enemigoDiego], this.items3.poligono1)

            this.items3.colisionParedDiagonal([this.jugador, this.enemigoJuan, this.enemigoUlises, this.enemigoNico, this.enemigoDiego], this.items3.poligono2)

         */


        //el siguiente bloque de codigo es para que no haya intercambio de golpes entre enemigos y jugador, si se encuentra
        //la pared de por medio. (la pared de la sala de envasado).

        //compruebo si hay enemigos del otro lado de la pared

            if (this.physics.overlap(this.areaDesactiva ,[this.enemigoJuan , this.enemigoUlises, this.enemigoNico, this.enemigoDiego ], 
                
                (area, enemigo) => {
                
                if (this.jugador.y > 1022  * this.escala){

                    enemigo.setVelocity(0); 
                    enemigo.active=false

                }else{
                    enemigo.active=true
                }

            
            }))






        // lanzamiento de carreta --------------------------------------------------------

        if (this.jugador.x > 1680 * this.escala && this.jugador.y < 1080  * this.escala && this.banderaCarreta == true ) { //ingresa a este condicional solo una vez

            this.items3.lanzaCarreta(this)   
 
        }

        // diego mirando el celu --------------------------------------------------------

        if (this.jugador.x < 3480  * this.escala && this.banderaDiegoCelu == true) { //diego esta con el celu

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

            this.physics.world.overlap(this.jugador.hitboxCuerpo.body ,this.items3.llave ,  (jugador, llave) => {llave.destroy(); this.llaveNegocio = true; this.sound.play('llave', { volume: 8 }); this.items3.sombra.destroy()});
        }


        if (this.llaveNegocio == true){

            this.add.image(1800  * this.escala, 250  * this.escala, 'llaveNegocio').setScale(0.5  * this.escala).setDepth(3).setScrollFactor(0) 
            // 'setScrollFactor(0) ' es para que la imagen quede anclada en la pantalla, y siga al jugador
        }



        

        //actualizar eje z de los personajes, para dar efecto de profundidad -----------------------------------------------
        //Pero esta vez, teniendo en cuenta la pared diagonal

        this.actualizarProfundidad(this.jugador, [this.enemigoJuan, this.enemigoUlises, this.enemigoNico, this.enemigoDiego, 
        this.items3.paredC, this.items3.paredEnvasado2, this.items3.vidrio1, this.items3.vidrio1b, this.items3.vidrio3, this.carreta,
        this.items3.mesa3, this.items3.amasadora, this.items3.tarimaAzucar , this.items3.cinta, this.items3.enfriadora, this.items3.molde
        , this.items3.enroladora, this.items3.envasadora, this.items3.maquina1, this.items3.maquina2, this.items3.tarimaEsencias,
        this.items3.tachoBasura
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

        if (this.jugador.x < 450  * this.escala   ){

            this.sound.stopAll()

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