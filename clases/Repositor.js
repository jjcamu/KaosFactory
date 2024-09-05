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

        this.cajaHabilitada = false

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

    cargarTimerRepositor(escena){  //esta funcion se llama desde el create() de la escena
  
        this.timerRepositor = escena.time.addEvent({
            delay: 2000,                // cada 3 segundos se llamará a la funcion 'mostrarAleatorio' 
            callback: mostrarAleatorio,
            args: [this],  //envio como argumento de la funcion, el objeto 'repositor'
            repeat: -1
        });

        function mostrarAleatorio(that){ // cada 3 segundos se llama a esta funcion, y esos 3 segundos sera la duracion 
                                            //del poder (si el poder es invocado 2 veces seguidas, durará 6 segundos)



            that.numeroAleatorio = Phaser.Math.Between(0, 100)
            
        }

        this.timerCaja = escena.time.addEvent({
            delay: 800,                
            callback: lanzarCaja,
            args: [this],
            repeat: -1
        });

        function lanzarCaja(that){


            that.cajaLanzada = true // lanza caja cada x segundos
            
        }

    }

    actualizarRepositor(escena){ //esta se llama desde el update()



            if (this.numeroAleatorio < 40 && (this.state != 'muerto' || this.state != 'heridoAlto' || this.state != 'heridoBajo') ){
                // si se cumple el Aleatorio, y si además, el repositor no esta muerto ni siendo golpeado, entonces arroja la caja.
    

                //if (this.anims.currentAnim.key != 'lanzaCaja') {this.anims.stop()}
    
                this.anims.play("lanzaCaja", true); // animacion del repositor lanzando una caja
    
    
                this.crearCaja(true, escena)
    
    
    
            }else {
    
                this.crearCaja(false, escena)
    
    
                super.actualizar(escena.jugador, this.compRepo)
    
            }
    
        }
    
        crearCaja(activado, escena) {
    
            if (this.cajaLanzada && activado == true){  // lanza la caja cada x segundos, siempre y cuando activado sea true
    
                this.cajaLanzada = false
    
                var caja= this.cajas.get(this.x, this.y); // creo el objeto sprite
    
                if (caja) {
        
                    caja.anims.create({  //creo la animacion
                        key: "caja",  //nombre de la animacion
                        frames: caja.anims.generateFrameNumbers("caja"), //nombre del spritesheet
                        frameRate:20, 
                        repeat:-1 
        
                    });

                    //reproduzco la animacion
                    caja.anims.play("caja", true); //nombre de la animacion a reproducir

                    if (escena.jugador.x > this.x){
                        caja.setVelocityX(400).setScale(0.5).setDepth(2);
                    }else{
                        caja.setVelocityX(-400).setScale(0.5).setDepth(2);
                    }
                    
                }
    
                
    
    
    
            }
    
    
        }
    
    
        
    
    }
   