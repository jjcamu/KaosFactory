
export default class intro extends Phaser.Scene {

    constructor() {
        super('intro');




    }

    init (data){ 

        this.gameOver = data.gameOver   


    }


    preload() {

//path de referencia desde el cual llamo a los archivos
        this.load.path = './multimedia/';

        this.load.image('pantalla1', 'imagenes/camusoft.jpg')  
        this.load.image('pantalla2', 'imagenes/nivel1/nuevo-1.jpg')
        this.load.image('pantalla3', 'imagenes/pantallaSeleccion.jpg')





        //posibles spritesheet del jugador

/*         this.load.spritesheet('juan', 'animaciones/ariel/ariel293x272.png', { frameWidth: 293, frameHeight: 272 });
        this.load.spritesheet('ariel', 'animaciones/ariel/ariel293x272.png', { frameWidth: 293, frameHeight: 272 });
        this.load.spritesheet('ulises', 'animaciones/facu/facu293x272.png', { frameWidth: 293, frameHeight: 272 });
        this.load.spritesheet('diego', 'animaciones/diego/diego293x272.png', { frameWidth: 293, frameHeight: 272 });
        this.load.spritesheet('nico', 'animaciones/facu/facu293x272.png', { frameWidth: 293, frameHeight: 272 });  */


  
    }


    crearPantalla1(escena){ //pantalla inicial 'Camusoft presenta...'

    //escena.scale.resize(2200, 1100);
    escena.scale.stopFullscreen();

        escena.pantalla1 = escena.add.image(escena.centrarX, escena.centrarY, 'pantalla1')
        escena.time.delayedCall(1000, escena.crearPantalla2, [escena]); //timer que llamará a la funcion 'crearPantalla2' dentro de X miliseg.
        // estaba en 3000 ms
    }

    crearPantalla2(escena){ //presentacion del juego 'Fac Ass' ' Rebelion en la Fabrica'

       

        escena.pantalla1.destroy()
        escena.pantalla2 = escena.add.image(escena.centrarX, escena.centrarY, 'pantalla2').setScale(1.5)
        escena.time.delayedCall(1000, escena.crearPantallaSeleccion, [escena]);

    }

    crearPantallaSeleccion(escena){ //pantalla de seleccion, 'elige un operiario: '

        escena.pantalla2.destroy()
        escena.pantalla3 = escena.add.image(escena.centrarX, escena.centrarY , 'pantalla3') 

        escena.jugadorElegido = 'ariel' // por defecto, el jugador elegido es Ariel

        escena.input.on('pointerdown', function (pointer) {  //si presiono en la escena ..



            //console.log(pointer.downX, pointer.downY) //muestro coordenadas en pantalla
            


            // verifico el area presionada 

            if (pointer.downX > 115 && pointer.downX < 370 && pointer.downY > 365 && pointer.downY < 588){

                console.log('ariel')

                escena.jugadorElegido = 'ariel'  //jugador elegido en el menu de seleccion

            }


            if (pointer.downX > 480 && pointer.downX < 730 && pointer.downY > 365 && pointer.downY < 588){

                console.log('juan')

                escena.jugadorElegido = 'juan'  //jugador elegido en el menu de seleccion

            }

            if (pointer.downX > 814 && pointer.downX < 1100 && pointer.downY > 365 && pointer.downY < 588){

                console.log('nico')

                escena.jugadorElegido = 'nico'  //jugador elegido en el menu de seleccion

            }


            if (pointer.downX > 1187 && pointer.downX < 1444 && pointer.downY > 365 && pointer.downY < 588){

                console.log('diego')

                escena.jugadorElegido = 'diego'  //jugador elegido en el menu de seleccion

            }

            if (pointer.downX > 1525 && pointer.downX < 1800 && pointer.downY > 365 && pointer.downY < 588){

                console.log('ulises')

                escena.jugadorElegido = 'ulises'  //jugador elegido en el menu de seleccion

            }

            if (pointer.downX > 748 && pointer.downX < 1175 && pointer.downY > 692 && pointer.downY < 839){
                //si presiono en el boton aceptar

                if (escena.scale.isFullscreen == false) {
                    
                    escena.scale.startFullscreen(); //pasar a pantalla completa
                } 

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




  
    }

}
