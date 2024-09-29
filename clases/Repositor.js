import Enemigo from "./Enemigo.js";

export default class Repositor extends Enemigo {


    

    


    constructor(escena, x, y, spriteSheet, indice) {
        super(escena, x, y, spriteSheet, indice); 

        this.compRepo = {

            pinia : [0,5] ,
            patada : [6,10] 
        }

        this.numeroAleatorio = 0
        this.poderEnCurso = false

        this.cajas = escena.physics.add.group({defaultKey: "caja"}) // creo un grupo de sprites con fisica, conformado
        // por imagenes de 'caja'    

        this.sombras = escena.physics.add.group({defaultKey: "sombra"}) // la sombra de cada caja

        this.cajaHabilitada = true

        this.cargarAnimacionesRepositor(spriteSheet);   //cargo las animaciones que solo corresponden a los repositores



    }

    cargarAnimacionesRepositor(spriteSheet) {

        this.anims.create({
            key: "lanzaCaja",
            frames: this.anims.generateFrameNumbers(spriteSheet,{start:44,end:52}), 
            frameRate:40, 
            repeat:0 
        });


}

//--------------- cada 3 segundos se escoje un numero aleatorio

    cargarTimerRepositor(escena){  //esta funcion se llama desde el create() de la escena
  
        this.timerRepositor = escena.time.addEvent({
            delay: 2000,                // cada 2 segundos se llamará a la funcion 'mostrarAleatorio' 
            callback: mostrarAleatorio,
            args: [this],  //envio como argumento de la funcion, el objeto 'repositor'
            repeat: -1
        });

        function mostrarAleatorio(that){ // cada 3 segundos se llama a esta funcion, y esos 3 segundos sera la duracion 
                                            //del poder (si el poder es invocado 2 veces seguidas, durará 6 segundos)



            that.numeroAleatorio = Phaser.Math.Between(0, 100)
            
        }



    }

    actualizarRepositor(escena){ //esta se llama desde el update()


            
            if (this.numeroAleatorio < 40 
                && this.state != 'muerto' && this.state != 'heridoAlto' && this.state != 'heridoBajo' ){
                // si se cumple el Aleatorio, y si además, el repositor no esta muerto ni siendo golpeado, entonces arroja la caja.


                this.anims.play("lanzaCaja", true); // animacion del repositor lanzando una caja

                this.setVelocity(0)

                if (this.cajaHabilitada == true) { 
                    
                    this.cajaHabilitada = false
                    this.crearCaja(escena);
                
                }


            }else {

                this.cajaHabilitada = true

                super.actualizar(escena.jugador, this.compRepo)
    
            }
    
        }
    


    crearCaja(escena) {


        escena.caja = this.cajas.get(this.x + 50, this.y ); // creo el objeto sprite en una variable de la escena

        escena.sombra  = this.sombras.get(this.x + 50, this.y + 65); // creo la sombra de cada caja

        if (escena.caja) {



            escena.caja.anims.create({  //creo la animacion
                key: "caja",  //nombre de la animacion
                frames: escena.caja.anims.generateFrameNumbers("caja"), //nombre del spritesheet
                frameRate: 10,
                repeat: -1

            });

            //reproduzco la animacion
            escena.caja.anims.play("caja", true); //nombre de la animacion a reproducir 

            escena.caja.setSize(escena.caja.width,escena.caja.height/3).setOffset(0,400)
            escena.sombra.setSize(escena.sombra.width + 20,escena.sombra.height/3 + 20).setOffset(-10,10)

            //escena.caja.name = 'caja' // para poder identificar al sprite 'caja' en el metodo que actualiza las profundidades

            if (escena.jugador.x > this.x) {
                escena.caja.setVelocityX(400 * escena.escala).setScale(0.5 * escena.escala).setDepth(2);

                if (escena.sombra) { escena.sombra.setVelocityX(400 * escena.escala).setScale(1.8 * escena.escala).setDepth(2);  }

            } else {
                escena.caja.setVelocityX(-400 * escena.escala).setScale(0.5 * escena.escala).setDepth(2);

                if (escena.sombra) { escena.sombra.setVelocityX(-400 * escena.escala).setScale(1.8 * escena.escala).setDepth(2);  }
            }

        }

        







    }
    
    
        
    
    
        
    
    }
   