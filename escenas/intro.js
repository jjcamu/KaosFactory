
export default class intro extends Phaser.Scene {

    constructor() {
        super('intro');




    }

    init (data){ 

        this.gameOver = data.gameOver   

        this.escala = 0.5
    }


    preload() {

        //path de referencia desde el cual llamo a los archivos
        this.load.path = './multimedia/';

        //pantallas iniciales
        this.load.image('pantalla1', 'imagenes/camusoft.jpg')  
        this.load.video('videoPresentacion', 'presentacion/presentacion.mp4', true);
        this.load.image('pantalla3', 'imagenes/pantallaSeleccion.jpg')

        this.load.image('seleccionAry', 'imagenes/seleccionAry.png')
        this.load.image('seleccionJuan', 'imagenes/seleccionJuan.png')
        this.load.image('seleccionNico', 'imagenes/seleccionNico.png')
        this.load.image('seleccionDiego', 'imagenes/seleccionDiego.png')
        this.load.image('seleccionUli', 'imagenes/seleccionUli.png')

        // musica de la presentacion

        this.load.audio('musicaSeleccion', 'audios/musicaNiveles/musicaSeleccion.mp3' )


        //posibles spritesheet del jugador

/*         this.load.spritesheet('juan', 'animaciones/ariel/ariel293x272.png', { frameWidth: 293, frameHeight: 272 });
        this.load.spritesheet('ariel', 'animaciones/ariel/ariel293x272.png', { frameWidth: 293, frameHeight: 272 });
        this.load.spritesheet('ulises', 'animaciones/facu/facu293x272.png', { frameWidth: 293, frameHeight: 272 });
        this.load.spritesheet('diego', 'animaciones/diego/diego293x272.png', { frameWidth: 293, frameHeight: 272 });
        this.load.spritesheet('nico', 'animaciones/facu/facu293x272.png', { frameWidth: 293, frameHeight: 272 });  */


  
    }


    crearPantalla1(escena){ //pantalla inicial 'Camusoft presenta...'


        escena.scale.stopFullscreen();
        escena.sound.stopAll()
        //escena.sound.pauseOnBlur = false; // para que la musica no se detenga al perder el foco el juego

        escena.pantalla1 = escena.add.image(escena.centrarX, escena.centrarY, 'pantalla1').setScale(0.5)
        escena.time.delayedCall(1000, escena.crearPantalla2, [escena]); //timer que llamará a la funcion 'crearPantalla2' dentro de X miliseg.
        // estaba en 3000 ms
    }

    crearPantalla2(escena){ //presentacion del juego 'Kaos Factory'

       

        escena.pantalla1.destroy()

        
        escena.video = escena.add.video(escena.centrarX + 10, escena.centrarY -10, 'videoPresentacion');

        escena.video.play(true).setLoop(false); //reproduzco el video y establezco que no se repita continuamente

        //si presiono en la pantalla, pasa a la pantalla de seleccion.
        escena.input.on('pointerdown', function (pointer) {escena.crearPantallaSeleccion(escena)})

        //escena.time.delayedCall(2000, escena.crearPantallaSeleccion, [escena]);

    }
 
    crearPantallaSeleccion(escena){ //pantalla de seleccion, 'elige un operiario: '

        escena.input.off('pointerdown')  // elimino el oyente del evento 'pointerdown', antes de añadirlo nuevamente, para que no me de error.

        escena.sound.play('musicaSeleccion' , { volume: 1 })

        escena.pantalla3 = escena.add.image(escena.centrarX + 5, escena.centrarY , 'pantalla3') .setScale(0.5)

        escena.jugadorElegido = 'ariel' // por defecto, el jugador elegido es Ariel

        escena.input.on('pointerdown', function (pointer) {  //si presiono en la escena ..



            //console.log(pointer.downX, pointer.downY) //muestro coordenadas en pantalla
            
         
           

            // verifico el area presionada 

            if (pointer.downX > 115 * this.escala && pointer.downX < 370 * this.escala && pointer.downY > 365 * this.escala && pointer.downY < 588 * this.escala){

                console.log('ariel')

                if (this.elegido) {this.elegido.destroy()}  // borro la imagen del jugador que se haya seleccinado

                this.elegido = escena.add.image(131, 240 , 'seleccionAry').setScale(0.5)

                escena.jugadorElegido = 'ariel'  //jugador elegido en el menu de seleccion

            }


            if (pointer.downX > 480 * this.escala && pointer.downX < 730 * this.escala && pointer.downY > 365 * this.escala && pointer.downY < 588 * this.escala){

                console.log('juan')

                if (this.elegido) {this.elegido.destroy()}

                this.elegido = escena.add.image(308, 240 , 'seleccionJuan').setScale(0.5)

                escena.jugadorElegido = 'juan'  //jugador elegido en el menu de seleccion
  
            }

            if (pointer.downX > 814 * this.escala && pointer.downX < 1100 * this.escala && pointer.downY > 365 * this.escala && pointer.downY < 588 * this.escala){

                console.log('nico')

                if (this.elegido) {this.elegido.destroy()}

                this.elegido = escena.add.image(485, 240 , 'seleccionNico').setScale(0.5)

                escena.jugadorElegido = 'nico'  //jugador elegido en el menu de seleccion
         
            }


            if (pointer.downX > 1187 * this.escala && pointer.downX < 1444 * this.escala && pointer.downY > 365 * this.escala && pointer.downY < 588 * this.escala){

                console.log('diego')

                if (this.elegido) {this.elegido.destroy()}

                this.elegido = escena.add.image(662, 240 , 'seleccionDiego').setScale(0.5)

                escena.jugadorElegido = 'diego'  //jugador elegido en el menu de seleccion

            }

            if (pointer.downX > 1525 * this.escala && pointer.downX < 1800  * this.escala && pointer.downY > 365 * this.escala && pointer.downY < 588 * this.escala){

                console.log('ulises')

                if (this.elegido) {this.elegido.destroy()}

                this.elegido = escena.add.image(839, 240 , 'seleccionUli').setScale(0.5)

                escena.jugadorElegido = 'ulises'  //jugador elegido en el menu de seleccion

            }

            if (pointer.downX > 748 * this.escala && pointer.downX < 1175 * this.escala && pointer.downY > 692 * this.escala && pointer.downY < 839 * this.escala){
                //si presiono en el boton aceptar

                if (escena.scale.isFullscreen == false) {
                    
                    escena.scale.startFullscreen(); //pasar a pantalla completa
                } 

                //detengo la musica de la presentacion
                escena.sound.stopAll()

                escena.scene.start('escena1', { jugadorElegido: escena.jugadorElegido })  
                // inicio el siguiente escenario, y como 2do parametro transfiero a la nueva escena informacion sobre el jugador elegido 
    

            }
  

        }, escena);



    }



    create() {

        this.centrarX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.centrarY = this.cameras.main.worldView.y + this.cameras.main.height / 2;


        if (this.gameOver == 'true') {  // cuando se reinicia el juego

            this.crearPantalla2(this)

        }else{  // cuando se inicia el juego por primera vez , se muestra el cartel 'Camusoft' ;)   
            
            this.crearPantalla1(this)
 
        }










        //this.introText = this.add.text(0,0,"toque la pantalla para comenzar...", { fontStyle: 'strong', align: 'right', font: '64px Arial', fill: 'red' });
       




    }

    update() {

/*         if(this.game.input.activePointer.isDown){
            console.log(this.input.mousePointer.worldX);
            console.log(this.input.mousePointer.worldY);
            } */


  
    }

}
