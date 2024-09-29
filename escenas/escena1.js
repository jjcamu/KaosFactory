import Paredes from "../clases/Paredes.js";
import Items from "../clases/Items.js";
import CargarRecursos from "../clases/CargarRecursos.js"

import Repositor from "../clases/Repositor.js";

import Enemigo from "../clases/Enemigo.js"




export default class escena1 extends Phaser.Scene { //defino una clase exportable llamada escena1, que hereda sus propiedades y metodos 
    //de la clase Phaser.Scene (estoy definiendo un escenario del juego)
    // el nombre de esta clase debe coincidir con el nombre del archivo .js que la contiene.

    constructor() { //metodo constructor de la clase (se invoca al instanciar un objeto de esta clase)

        super('escena1'); //invoco al constructor de la clase padre, y le ingreso como parametro el
        //nombre de la escena 'nivel1'

    }

    init (data){  //desde la funcion init() puedo obtener los argumentos ingresados desde la escena anterior
        //Osea, de esta forma puedo pasar datos entre escenas.

        this.jugadorX = 0
        this.jugadorY = 0
        this.vidasJugador = 0


        if (data.escenaAnterior == 'escena2'){ //si la escena anterior fue la 'escena2', la posicion inicial del jugador será...
            this.jugadorX = 5110
            this.jugadorY = 690

            this.vidasJugador = data.vidas //conservo las vidas del escenario anterior

            this.llaveNegocio = data.llaveNegocio // booleano que indica si el jugador posee la llave para ingresar al negocio ( escenario 4)


        }else{ // si no hubo escena anterior (recien arranca el juego)

            this.jugadorX = 400
            this.jugadorY = 600

            this.vidasJugador = 100 //vidas al inicio del juego

            this.llaveNegocio = false
        }

        
        this.escenaAnterior = data.escenaAnterior 

        this.jugadorElegido = data.jugadorElegido  // guardo el jugador elegido en la pantalla de seleccion de la escena anterior

        this.escala = 0.5


    }




// las funciones preload, create y update , son funciones de la clase Scene (Phaser.Scene)

    preload(){  //funcion que carga los recursos en memoria (se ejecuta una sola vez)


        this.recursos = new CargarRecursos ();

        this.recursos.cargarRecursosComunes(this)




        //path de referencia desde el cual llamo a los archivos
        this.load.path = './multimedia/';

        //imagen de fondo 
        this.load.image('fondo', 'imagenes/nivel1/fondo.png'); //cargo una imagen, y la asocio a la etiqueta 'fondo'
        //'this' hace referencia a la escena (objeto Scene)
    
        //sprites del escenario
        this.load.image('cartelInicial', 'imagenes/nivel1/cartelInicioJuego.png')
        this.load.image('bolsaBasura', 'imagenes/nivel1/fabrica1_bolsabasura.png');
        this.load.image('costadoPorton', 'imagenes/nivel1/fabrica1_costadoporton.png');
        this.load.image('heladera', 'imagenes/nivel1/fabrica1_heladera.png');
        this.load.image('puertaNegocio', 'imagenes/nivel1/fabrica1_puertanegocio.png');
        this.load.image('porton', 'imagenes/nivel1/fabrica1_porton.png');
        this.load.image('heladeraAbierta', 'imagenes/nivel1/fabrica1_heladera_abierta.png')
        this.load.image('cartel1', 'imagenes/nivel1/nuevo-1.jpg')
        this.load.image('cartel2', 'imagenes/nivel1/nuevo-2.jpg')
        this.load.image('cartel3', 'imagenes/nivel1/nuevo-3.jpg')
        this.load.image('aceptar', 'imagenes/Untitled-2 copy.png')

    
        //animaciones (hojas de sprite)
        this.load.spritesheet('explosion', 'animaciones/nivel1/explosion_012-3-Sheet70x70.png', { frameWidth: 70, frameHeight: 70 });
        this.load.spritesheet('portonRoto', 'animaciones/nivel1/porton_roto0001-Sheet400x300.png', { frameWidth: 400, frameHeight: 300 });
        this.load.spritesheet('leche', 'animaciones/nivel1/leche-1-Sheet.png', { frameWidth: 213, frameHeight: 500 });
        this.load.spritesheet('galletitas', 'animaciones/nivel1/galletitas365x500.png', { frameWidth: 365, frameHeight: 500 });
        this.load.spritesheet('sombra', 'animaciones/nivel1/sombra0001-1-Sheet.png', { frameWidth: 72, frameHeight: 38 });
        this.load.spritesheet('flecha', 'animaciones/flecha-1-sheet800x500.png', { frameWidth: 800, frameHeight: 500 });

        this.load.spritesheet('oso', 'animaciones/facu/facu293x272.png', { frameWidth: 293, frameHeight: 272 });
        this.load.spritesheet('flor', 'animaciones/facu/facu293x272.png', { frameWidth: 293, frameHeight: 272 });
        this.load.spritesheet('fede', 'animaciones/facu/facu293x272.png', { frameWidth: 293, frameHeight: 272 });

        this.load.spritesheet('caja', 'animaciones/nivel1/caja340x340.png', { frameWidth: 340, frameHeight: 340 });
        this.load.image('sombra', 'imagenes/nivel1/sombra.png')

    }

    create(){

        this.physics.world.setFPS(120);//establezco cuadros por segundo a 120 .
        //Esto, y ademas establecer un factor de rebote de 1 en el enemigo, sirve para asegurarme que el cuerpo del enemigo 
        //no atraviese las paredes (las areas de colision)


        ////// imagen de fondo del escenario

        this.fondo = this.add.image(0, 0, 'fondo').setOrigin(0, 0).setScale(2.2).setDepth(-2);
        // 'this.add.image(0, 0, 'fondo') ' devuelve una imagen que estará ubicada en la coordenada 0,0 .
        //  Peeero en Phaser 3, las coordenadas 0,0 corresponde al centro de la imagen .
        // Con el metodo 'setOrigin()' puedo cambiar esto, y hacer que la coordenada 0,0 sea la esquina 
        //superior izquierda. 
        //setScale() : escalo la imagen
        //setDepth() : defino la profundidad en el eje 'z' (z-index). Por defecto, los gameobjects se crean en el depth 0 .




        ////// items (sprites) con los que puede interactuar el jugador

        this.items = new Items (this.physics.world, this);
        // instancio un objeto que contiene todos los elementos del escenario (porton, heladera, etc)
        // la clase Items, extiende de 'Phaser.Physics.Arcade.Group', por lo cual es obligatorio pasarle como parametro al menos
        // 'this.physics.world' que es el sistema de fisicas en uso, y 'this' que hace referencia a esta escena.
        // El constructor de 'Phaser.Physics.Arcade.Group' exige esos dos parametros para poder instanciarse.



        ////// paredes del escenario
        // la clase Paredes es un grupo de sprites estaticos (no se mueven), vacios (invisibles porque no contienen un dibujo o textura), 
        //pero si contienen un area de colision, contra la cual chocará el personaje y los enemigos.
        this.paredes = new Paredes(this.physics.world, this);
        this.paredes.setDepth(-3)


        
        ////// enemigos (en la escena1 hay enemigos cuando el jugador viene de la escena2, y con la llave de diego)



        //esta declaracion inicial la hago para evitar errores con las funciones que trabajan con los cuerpos de los sprites 
        // ej: this.physics.add.group(), debido a un error en la logica de mi programacion :(
        this.enemigoJuan = new Enemigo(this, 0, -200, 'juan', 1)
        this.enemigos = this.physics.add.group([this.enemigoJuan]) 

        this.enemigoFlor = new Enemigo(this, 0, -200, 'juan', 1)

        this.enemigoOso = new Enemigo(this, 0, -200, 'juan', 1)

        this.enemigoFede = new Enemigo(this, 0, -200, 'juan', 1)

        if (this.escenaAnterior == 'escena2' && this.llaveNegocio == true){  
            
            this.enemigoFlor = new Repositor(this, 3900, 600, 'flor', 2);

            this.enemigoOso = new Repositor(this, 3600, 700, 'oso', 2);

            this.enemigoFede = new Repositor(this, 3400, 700, 'fede', 2);

            
            this.enemigoFlor.cargarTimerRepositor(this) //cargo el timer desde el create() de la escena, para que se llame solo una vez
            
            this.enemigoOso.cargarTimerRepositor(this) 

            this.enemigoFede.cargarTimerRepositor(this) 
        
        
            this.enemigos = this.physics.add.group([this.enemigoFlor, this.enemigoOso, this.enemigoFede]) 
     

        
                
        }


        this.recursos.crearElementosComunes(this , this.jugadorX, this.jugadorY, this.jugadorElegido)  
        //parametros : la escena (this) , la posicion inicial del jugador y el jugador elegido

        this.jugador.vidas = this.vidasJugador

        this.banderaNegocio = true


        ////// colisiones

        this.physics.add.collider(this.jugador, this.paredes);

        this.physics.add.collider(this.jugador, this.items.costadoPorton);

        this.physics.add.collider(this.jugador, this.enemigos);

        this.physics.add.collider(this.paredes, this.enemigos);

        this.physics.add.collider(this.items.bolsaBasura, this.jugador ); 
        //colision, choque entre el objeto y el body del jugador
        this.physics.add.overlap( this.items.bolsaBasura, [this.jugador.hitboxPinia, this.jugador.hitboxPatada], this.items.golpe, null, this);
        //superposicion entre el objeto y el hitbox del golpe del jugador. En caso de que exista superposicion, se llama a la 
        //funcion 'golpe', que recibirá 2 parametros, el objeto golpeado, y el hitbox con el que se superpuso.

        this.physics.add.collider(this.items.porton, this.jugador );
        this.physics.add.overlap( this.items.porton, [this.jugador.hitboxPinia, this.jugador.hitboxPatada], this.items.golpe, null, this);

        this.physics.add.collider(this.items.heladera, this.jugador );
        this.physics.add.overlap( this.items.heladera, [this.jugador.hitboxPinia, this.jugador.hitboxPatada], this.items.golpe, null, this);

        this.physics.add.collider(this.items.puertaNegocio, this.jugador, this.items.compruebaLLaveNegocio , null, this );


        //toma la lechita

        this.physics.add.overlap(this.jugador, this.items.sombra , this.items.tomaLechita, null, this)
        //en el ultimo parametro , le estoy pasando a la funcion 'tomaLechita()' el contexto this (en este caso la escena),
        //para poder utilizarlo en la funcion.

        // come galletitas
        this.physics.add.overlap( this.items.galletitas , [this.jugador.hitboxPinia, this.jugador.hitboxCuerpo], this.items.comeGalletitas, null, this)

       

        this.juegoPausado = false;

        this.banderaPasar = false // para que el personaje no pueda pasar al escenario 4 sin haber matado a los enemigos repositores

        this.banderaPuedenArrojarCajas = false

        this.banderaCartel = true

        this.caja = this.physics.add.sprite(0, 0)  //sprite vacio, para que la actualizacion de profundidad no me de error
        this.sombra = this.physics.add.sprite(0, 0)



//Escalo todo los gameObjects de la escena. Esto lo tuve que hacer para aumentar el rendimiento del juego.
//Reduje la resolucion del juego , y por lo tanto debo tambien reducir las dimensiones y areas de colision de cada elemento del juego.
//Mi error fue hacer el juego desde el principio con una resolucion innecesariamente alta.

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

    update (){

        this.jugador.actualizar(this.controlJoystick, this.controlTeclado, this.enemigos) 

        //cartel inicial

        if (this.jugador.x > 300  && this.escenaAnterior != 'escena2'){

            if  (this.banderaCartel == true){


                this.items.cartelInicial(this)
      
                this.banderaCartel = false

            }
        }



        // cartel desayuno

        if ((this.jugador.x > 3150 * this.escala) && (this.juegoPausado == false) && (this.escenaAnterior != 'escena2')){
            // si el juego no esta pausado y si la escena anterior no era la escena 2..
            

            this.items.cartelDesayuno(this)

        }

        if (this.jugador.x > 5220 * this.escala ){
            

            this.scene.start('escena2', { vidas: this.jugador.vidas , escenaAnterior: this.scene.key , jugadorElegido: this.jugadorElegido , llaveNegocio: this.llaveNegocio })
            // al iniciar la escena2, transfiero a esta las vidas de mi personaje, el nombre de esta escena (que pasará a ser la escena anterior)
            // y el jugador seleccionado en el menu inicial del juego
        }


        /// aparicion de los repositores  -----------------------------------------------------------------------------------

        if ( this.escenaAnterior == 'escena2'  && this.llaveNegocio == true){
            
            if (this.jugador.x < 4270 * this.escala){ this.banderaPuedenArrojarCajas = true}


            if (this.banderaPuedenArrojarCajas == true){

                this.enemigoFlor.actualizarRepositor(this)
                this.enemigoOso.actualizarRepositor(this)
                this.enemigoFede.actualizarRepositor(this)



            }

            if (this.enemigoFlor.state == "muerto" && this.enemigoOso.state == "muerto" && this.enemigoFede.state == "muerto"){
                // si todos los repositores de este escenario murieron
    
                this.banderaPasar = true  // se puede pasar al escenario 4
            }


        }



        // cajas

        if (this.enemigoFlor.cajas || this.enemigoOso.cajas || this.enemigoFede.cajas){ 


            if (this.physics.overlap(this.jugador.body, [this.enemigoFlor.cajas, this.enemigoOso.cajas, this.enemigoFede.cajas],  (jugador, caja) => {caja.destroy()}) == true){ this.items.golpeaCaja(this)}
            if (this.physics.overlap(this.jugador.body, [this.enemigoFlor.sombras, this.enemigoOso.sombras, this.enemigoFede.sombras],  (jugador, sombra) => {sombra.destroy()}) == true){ }

/*             if (this.physics.overlap(this.paredes, [this.enemigoFlor.cajas, this.enemigoOso.cajas, this.enemigoFede.cajas],  (pared, caja) => {caja.destroy()}) == true){ }
            if (this.physics.overlap(this.paredes, [this.enemigoFlor.sombras, this.enemigoOso.sombras, this.enemigoFede.sombras],  (pared, sombra) => {sombra.destroy()}) == true){ }
 */

        }





        this.actualizarProfundidad(this.jugador, [this.items.costadoPorton, this.items.leche,  this.enemigoFlor,
            this.enemigoOso, this.enemigoFede, this.caja , this.sombra,  this.items.puertaNegocio])


//this.enemigoFlor.cajas, this.enemigoOso.cajas, this.enemigoFede.cajas
        if(this.game.input.activePointer.isDown){
            console.log(this.input.mousePointer.worldX);
            console.log(this.input.mousePointer.worldY);
            }


        
    

    }


        //para dar efecto de profundidad, voy variando la propiedad 'depth' de los sprites del escenario segun la posicion de mi jugador

        actualizarProfundidad(jugador, todosLosSprites){


            todosLosSprites.forEach((sprite) => {   // recorro todos los sprites

                if (sprite.body) {
                //si un sprite fue eliminado del escenario ,como ser una caja por haber impactado con el jugador o con las paredes.. 
                //no se procesará.
    
    
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
    
                        if (spriteB.body && sprite.body ) {
                            if (spriteB.body.y > sprite.body.y){ 
    
                                spriteB.setDepth(1);
    
                            }
                        }
    
    
                        })
                
                
                
                }
    
    
            }
    
            })
    
        }



}