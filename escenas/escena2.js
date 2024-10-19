import Enemigo from "../clases/Enemigo.js";
import Paredes2 from "../clases/Paredes2.js";
import Items2 from "../clases/Items2.js";
import CargarRecursos from "../clases/CargarRecursos.js"
import Hernan from "../clases/Hernan.js";




export default class escena2 extends Phaser.Scene {

    constructor() {

        super('escena2');



    }

    init (data){  //desde la funcion init() puedo obtener los argumentos ingresados desde la escena anterior
        //Osea, de esta forma puedo pasar datos entre escenas.

        this.jugadorX = 200  //200
        this.jugadorY = 1050 //1050
        this.vidasJugador = 250  // por si arranco el juego desde este nivel


        if (data.escenaAnterior == 'escena3'){ //si la escena anterior fue la 'escena3', la posicion inicial del jugador será...
            this.jugadorX = 6232
            this.jugadorY = 1053
            this.vidasJugador = data.vidas //conservo las vidas del escenario anterior

        }else if (data.escenaAnterior == 'escena1') { 
            this.jugadorX = 200
            this.jugadorY = 1050
            this.vidasJugador = data.vidas //conservo las vidas del escenario anterior
        }


        
        this.escenaAnterior = data.escenaAnterior 
        this.jugadorElegido = data.jugadorElegido  

        this.llaveNegocio = data.llaveNegocio
        
        
        //this.llaveNegocio = true


        this.escala = 0.5
    }

    preload(){
       // this.scale.resize(2)
        this.recursos = new CargarRecursos ();  //==========================================>>>>

        this.recursos.cargarRecursosComunes(this)  //========================================>>>> ESTO LO PUSE PARA ARRANCAR DEL NIVEL2






        //path de referencia desde el cual llamo a los archivos
        this.load.path = './multimedia/';

        //imagen de fondo 
        this.load.image('fondo2', 'imagenes/nivel2/escenario2B.png');


        // sprites del escenario
        this.load.image('globo1', 'imagenes/nivel2/globo12.png');
        this.load.image('globo2', 'imagenes/nivel2/globo22.png');
        this.load.image('globo3', 'imagenes/nivel2/globo3.png');
        this.load.image('globo4', 'imagenes/nivel2/globo4.png');
        this.load.image('globo5', 'imagenes/nivel2/globo5.png');
        this.load.image('globo6', 'imagenes/nivel2/globo6.png');
        this.load.image('tanque', 'imagenes/nivel2/tanque_glucosa.png');
        this.load.image('moto', 'imagenes/nivel2/guerrero.png');
        this.load.image('bici', 'imagenes/nivel2/bici2.png');
        this.load.image('carreta', 'imagenes/nivel2/carro.png');
        this.load.image('tarima', 'imagenes/nivel2/tarima.png');
        this.load.image('tacho3', 'imagenes/nivel2/tacho3.png');
        this.load.image('columna', 'imagenes/nivel2/columna.png');
        this.load.image('herramientas', 'imagenes/nivel2/herramientas.png');
        this.load.image('tacho2', 'imagenes/nivel2/tacho2.png');
        this.load.image('tacho1', 'imagenes/nivel2/tacho1.png');
        this.load.image('matafuego', 'imagenes/nivel2/matafuego.png');
        this.load.image('zorra', 'imagenes/nivel2/zorra.png');
        this.load.image('mosquitero', 'imagenes/nivel2/mosquitero.png');
        this.load.image('cortina1', 'imagenes/nivel2/cortina1.png');
        this.load.image('cortina2', 'imagenes/nivel2/cortina2.png');
        this.load.image('puertaTaller', 'imagenes/nivel2/puertaTaller.png');
        this.load.image('oscuridad', 'imagenes/nivel2/oscuridad.png');


        //spritesheets

        
        this.load.spritesheet('explosion2', 'animaciones/nivel2/explosion200x200.png', { frameWidth: 200, frameHeight: 200 });
        this.load.spritesheet('ariel', 'animaciones/ariel/ariel293x272.png', { frameWidth: 293, frameHeight: 272 });
        this.load.spritesheet('facu', 'animaciones/facu/facu293x272.png', { frameWidth: 293, frameHeight: 272 });
        this.load.spritesheet('pedo', 'animaciones/nivel2/pedo0001-sheet.png', { frameWidth: 550, frameHeight: 400 });
        this.load.spritesheet('gotaFuego', 'animaciones/nivel2/fuego59x128-sheet.png', { frameWidth: 59, frameHeight: 128 });
        this.load.spritesheet('pollo', 'animaciones/nivel2/SpritePollo400x500.png', { frameWidth: 400, frameHeight: 500 });
        this.load.spritesheet('sombra', 'animaciones/nivel1/sombra0001-1-Sheet.png', { frameWidth: 72, frameHeight: 38 });

        this.load.spritesheet('hernan', 'animaciones/diego/diego293x272.png', { frameWidth: 293, frameHeight: 272 });

        
        //audios del escenario
        this.load.audio('musicaNivel12y3', 'audios/musicaNiveles/musicaNivel12y3.mp3' )
        this.load.audio('bossHernan', 'audios/musicaNiveles/bossHernan.mp3' )
        this.load.audio('tos', 'audios/sonidos/tos.ogg'   )
        this.load.audio('sonidoTemblor', 'audios/sonidos/lluviaFuego.ogg' )
        this.load.audio('golpeFuego', 'audios/sonidos/golpeFuego.ogg' )
        this.load.audio('golpeObjeto', 'audios/sonidos/golpeObjeto.ogg' )




    }

    create(){
        


        this.compAriel = {

            pinia : [0,5] ,
            patada : [6,10] 
        }

        this.compFacu = {

            pinia : [0,5] ,
            patada : [6,10] 
        }

        this.physics.world.setFPS(120);//establezco cuadros por segundo a 120 .
        //Esto, y ademas establecer un factor de rebote de 1 en el enemigo, sirve para asegurarme que el cuerpo del enemigo 
        //no atraviese las paredes (las areas de colision)

        this.events.on('shutdown', () => { this.sound.stopAll() }) //frena la musica si se sale del escenario (para evitar errores de audio)


        ////// imagen de fondo del escenario


        this.fondo = this.add.image(0, 0, 'fondo2').setOrigin(0, 0).setScale(4 , 3.4 ).setDepth(-2);


        ////// paredes del escenario
        this.paredes2 = new Paredes2(this.physics.world, this);
        this.paredes2.setDepth(-3)



        ////// items (sprites) con los que puede interactuar el jugador

        this.items2 = new Items2 (this.physics.world, this);


        ///// array de items rompibles

        this.itemsRompibles = [this.items2.carreta, this.items2.moto, this.items2.tacho1a,
            this.items2.tacho1b,this.items2.tacho2a,this.items2.tacho2b,this.items2.tacho3a,this.items2.tacho3b, this.items2.tacho3c, 
            this.items2.bici, this.items2.matafuego]


        ////// enemigos



        if (this.escenaAnterior == 'escena1'){  


            if (this.jugadorElegido == 'ariel') {  //si el jugador seleccionado es Ariel, entonces el enemigo será Juan 
                // (para no repetir el personaje)

                this.enemigo1 = new Enemigo(this, 5500, 1200, 'juan', 1);

            }else{  //sino, el enemigo será Ariel
            
            this.enemigo1 = new Enemigo(this, 5500, 1200, 'ariel', 2);

            }

            this.enemigos = this.physics.add.group([this.enemigo1]) // en este grupo solo pongo 1 enemigo, ya que en esta escena
            // solo aparecerá un solo enemigo
    

        
        } else {  //si la escena anterior fuese 'escena3'

            //this.enemigoAriel.disableBody(true).setVisible(false).setPosition(8000,2000)
            //quito a Ariel de la escena
        
            this.enemigo1 = new Hernan(this, 2193, 224, 'hernan', 2);


            this.enemigo1.cargarTimerHernan(this) //cargo el timer desde el create() de la escena, para que se llame solo una vez
        
            this.enemigos = this.physics.add.group([this.enemigo1]) 




        }


        /////// crear los elementos que son comunes a todos los escenarios del juego

        this.recursos = new CargarRecursos (); //instancio un objeto de esta clase, solo para usar su metodo 'crearElementosComunes'

        this.recursos.crearElementosComunes(this , this.jugadorX, this.jugadorY, this.jugadorElegido)  
        //parametros : la escena (this) , la posicion inicial del jugador y el jugador elegido
                                                    //4967 (para pruebas)
                                                    
        this.jugador.vidas = this.vidasJugador


        ////// colisiones


        this.physics.add.collider(this.paredes2, [this.jugador, this.enemigo1, this.items2.carreta, this.items2.moto, this.items2.bici,
            this.items2.zorra ] );

        this.physics.add.collider(this.jugador, [this.enemigo1, this.items2.carreta, this.items2.moto, this.items2.tacho1a,
            this.items2.tacho1b,this.items2.tacho2a,this.items2.tacho2b,this.items2.tacho3a,this.items2.tacho3b, this.items2.tacho3c,
            this.items2.zorra,this.items2.herramientas,this.items2.columna, this.items2.bici]  );

            

        this.limite = 0;  ////// limite del contador (timer) 

        this.banderaDialogo = true  // bandera del dialogo inicial de Ariel (true: hay dialogo, false: no hay dialogo)

        this.banderaGlobo1 = true; // bandera para llamar una sola vez a un determinado fragmento de la funcion 'items2.dialogoAriel'

        this.banderaHernan = true

        this.banderaHernan2 = true

        this.banderaHernan3 = true

        this.banderaHernan4 = true

        this.banderaCamara = true

        this.banderaCamara2 = true

        this.animacionAparicionHernan = false //esta vigente la cinematica de la aparicion de hernan?

        this.banderaDialogoHernan = true

        this.banderaFacu = true //aparicion de Facu. (creacion del enemigo Facu) Para que solo se llame una vez.

        this.banderaDialogoFacu = false // dialogo con facu

        this.banderaVolver = true // para que el personaje no pueda pasar de escenario sin haber matado a los enemigos

        this.banderaPasar = true // similar a banderaVolver

        this.banderaSonido2 = true // para no reproducir reiteradas veces un sonido 

        this.banderaSonido3 = true

        this.banderaSonido4 = true

        this.banderaLiberarMemoria = true




        //let todosLosGameObjects = this.children.list.filter(x => x instanceof Phaser.GameObjects.GameObject);

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

    update (time, delta){ // ingreso el parametro 'time' , ya que voy a utilizarlo


    



        // actualizacion del estado del jugador
        this.jugador.actualizar(this.controlJoystick, this.controlTeclado, this.enemigos)



        // para manejar la profundidad (eje Z) con respecto a los demas sprites
        this.actualizarProfundidad(this.jugador, [this.enemigo1, this.items2.carreta, this.items2.moto, this.items2.tacho1a,
            this.items2.tacho1b,this.items2.tacho2a,this.items2.tacho2b,this.items2.tacho3a,this.items2.tacho3b, this.items2.tacho3c,
            this.items2.zorra,this.items2.herramientas,this.items2.columna,this.items2.cortina1,this.items2.cortina2, this.items2.bici] ) 



      

        //// pedo --------------------------------------------------------------------------------------------------

        if ((this.jugador.x > 350 * this.escala) && (time > this.limite) ) {
        // si el tiempo del sistema (time) excede el 'limite' , se ingresa al bloque 'if' y se crea un pedo.
        // solo se ingresará nuevamente al bloque, cuando se exceda nuevamente el limite.
        // Este condicional trabaja como un 'timer'.

            this.limite = time  // corrección para que no mande un monton de pedos al inicio

            this.items2.crearPedo(this)
            this.limite += 3000;  //incremento el limite, para que se ingrese al bloque 'if' dentro de aproximadamente 3 segundos
        }

        if (this.items2.pedo){ // si existe un pedo en el escenario

            //compruebo constantemente si existe superposicion entre el jugador y algun integrante del grupo de los pedos.
            //en caso de existir esta superposicion, llamo a la funcion 'inhalaPedo' dentro del modulo 'items2'
            this.physics.world.overlap(this.jugador.hitboxCuerpo.body, this.items2.pedos, this.items2.inhalaPedo, null, this);

            // que desaparezca el pedo al colisionar con el limite inferior del escenario
            this.physics.world.overlap(this.paredes2.pared_abajo.body ,this.items2.pedos ,  (pared, pedo) => {pedo.destroy()});
        }





        //// manejo del flujo del juego para el dialogo con Ariel  -----------------------------------------------------------
        if (this.jugador.x > 4000 * this.escala && this.banderaDialogo == true  && this.escenaAnterior == 'escena1') {

           this.banderaPasar = false  // esta bandera obliga al jugador a matar a ariel si se desea pasar al escenario3
          

           this.items2.dialogoAriel(this)   // dialogo con Ariel

        } else if (this.escenaAnterior == 'escena1'){

           this.enemigo1.actualizar(this.jugador, this.compAriel) // comportamiento normal del enemigo

        }

        if (this.enemigo1.state == "muerto" && (this.enemigo1.name == "ariel" || this.enemigo1.name == "juan" )){
            // si el enemigo murió, y ese enemigo era Ariel , (o Juan, si el jugador seleccionado fue Ariel), entonces
            // habilito el pase al siguiente nivel


            this.banderaPasar = true
        }


        /// aparicion de hernan  -----------------------------------------------------------------------------------

        if ( this.escenaAnterior == 'escena3'){


            if (this.jugador.x < 3000 * this.escala && this.banderaHernan == true){

                this.banderaVolver = false // esta bandera obliga al jugador a matar a hernan y a facu si se desea ir al
                //escenario1 habiendo superado del escenario3


                
                // reproduzco la musica del boss Hernan
                if (this.banderaSonido2== true) {
                    
                    //detengo la musica del escenario
                    this.sound.stopAll()

                    this.sound.play('bossHernan' , { volume: 0.5 , loop: true  }); 
                    this.banderaSonido2 = false

                
                }

                this.items2.aparicionHernan(this)
                
                this.animacionAparicionHernan = true

                this.enemigo1.body.checkCollision.none = true;  //anulo la colision de hernan, para que el pueda arrojarse
                //desde el taller sin colisionar con el estante que tiene debajo



            }else if (this.banderaHernan4 == false && this.enemigo1.name == 'hernan'){ 
            //banderaHernan4 se hace 'false' cuando finaliza la 'aparicion de hernan',
            //entonces comienza a pelear

                this.animacionAparicionHernan = false

                this.enemigo1.actualizarHernan(this)

            }

            if (this.jugador.x < 890 * this.escala && this.banderaFacu == true && this.enemigo1.state == "muerto"){
                //cuando muere hernan aparece facu


                this.enemigo1 = new Enemigo(this, 200 * this.escala, 1200 * this.escala, 'facu', 2);



/*                 if (this.banderaLiberarMemoria == true){

                    // elimino escenas que no voy a utilizar , para liberar memoria
                    // lo hago en este momento, ya que supongo que el jugador no querrá volver al escenario3 

                    this.scene.remove('intro') //elimino la intro del juego
                    this.scene.remove('escena3')  //elimino el escenario3

                    //console.dir(this.game.scene.scenes)

                    this.banderaLiberarMemoria = false

                } */



                // escalo a facu

                this.enemigo1.displayWidth =  this.enemigo1.displayWidth * this.escala
                this.enemigo1.displayHeight =  this.enemigo1.displayHeight * this.escala

                 this.enemigo1.body.width =  this.enemigo1.body.width * this.escala
                this.enemigo1.body.height =  this.enemigo1.body.height * this.escala 

                this.enemigo1.hitboxPinia.body.setSize(140 * this.escala,100 * this.escala).setOffset(50 * this.escala,-80 * this.escala)
        
                this.enemigo1.hitboxPatada.body.setSize(140 * this.escala,150 * this.escala).setOffset(50 * this.escala,10 * this.escala)
        
                this.enemigo1.hitboxCuerpo.body.setSize(100 * this.escala,300 * this.escala).setOffset(-15 * this.escala,-150 * this.escala)
 
                

                // al modificar al 'enemigo1' , tengo que volver a integrarlo al grupo, y a las colisiones.
                // este bloque de codigo se ejecuta una sola vez gracias a 'banderaFacu'
                this.enemigos = this.physics.add.group([this.enemigo1]) 

                this.physics.add.collider(this.jugador, [this.enemigo1])

                this.physics.add.collider(this.paredes2, [this.enemigo1])

                this.banderaDialogoFacu = true //habilito el dialogo con Facu

                this.banderaGlobo1 = true;

                this.banderaFacu = false
      
               
            }

            if ( this.banderaDialogoFacu == true ){

                this.items2.dialogoFacu(this)   // dialogo con Facu

            }else if (this.enemigo1.name == 'facu'){
                
                this.enemigo1.actualizar(this.jugador, this.compFacu)
            }

            if (this.enemigo1.state == "muerto" && this.enemigo1.name == "facu"){


                this.banderaVolver = true
            }

        }

        //si agarro el pollo

        if (this.pollo){

            this.physics.world.overlap(this.jugador.hitboxCuerpo.body ,this.sombra,  (jugador, sombra) => {
                sombra.destroy();  
                this.sound.play('comer', { volume: 8 })
                this.jugador.vidas = this.jugador.vidas + 50; 
                this.pollo.destroy()});
        }



        //// pasa a siguiente escena  -----------------------------------------------------------------------------------------


        if (this.jugador.x > 6470 * this.escala && this.jugador.y < 1085 * this.escala  &&  this.banderaPasar == true  ){
            
                           
            this.sound.stopAll()

            this.scene.start('escena3', { vidas: this.jugador.vidas , escenaAnterior: this.scene.key , jugadorElegido: this.jugadorElegido , llaveNegocio: this.llaveNegocio })    

        }

        if (this.jugador.x < 35 * this.escala  && this.banderaVolver == true  ){

            this.sound.stopAll()

            this.scene.start('escena1', { vidas: this.jugador.vidas , escenaAnterior: this.scene.key , jugadorElegido: this.jugadorElegido , llaveNegocio: this.llaveNegocio })

        }


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