import Enemigo from "./Enemigo.js";

export default class Martin extends Enemigo {


    

    


    constructor(escena, x, y, spriteSheet, indice) {
        super(escena, x, y, spriteSheet, indice); 

        this.compMartin = {

            pinia : [0,5] ,
            patada : [6,10] 
        }

        this.numeroAleatorio = 0
        this.poderEnCurso = false

        this.sobres = escena.physics.add.group({defaultKey: "sobre"}) // creo un grupo de sprites con fisica, conformado
        // por imagenes de 'sobre'    

        this.sobreHabilitado = false

        this.cargarAnimacionesMartin(spriteSheet);   //cargo las animaciones que solo corresponder a martin



    }

    cargarAnimacionesMartin(spriteSheet) {

        this.anims.create({
            key: "lanzaSobre",
            frames: this.anims.generateFrameNumbers(spriteSheet,{start:44,end:52}), 
            frameRate:40, 
            repeat:0 
        });




}

    cargarTimerMartin(escena){  //esta funcion se llama desde el create() de la escena
  
        this.timerMartin = escena.time.addEvent({
            delay: 2000,                // cada 3 segundos se llamará a la funcion 'mostrarAleatorio' 
            callback: mostrarAleatorio,
            args: [this],  //envio como argumento de la funcion, el objeto 'Martin'
            repeat: -1
        });

        function mostrarAleatorio(that){ // cada 3 segundos se llama a esta funcion, y esos 3 segundos sera la duracion 
                                            //del poder (si el poder es invocado 2 veces seguidas, durará 6 segundos)



            that.numeroAleatorio = Phaser.Math.Between(0, 100)
            
        }

        this.timerSobre = escena.time.addEvent({
            delay: 1000,                
            callback: lanzarSobre,
            args: [this],
            repeat: -1
        });

        function lanzarSobre(that){


            that.sobreLanzado = true // lanza sobre cada x segundos
            
        }

    }

    actualizarMartin(escena){ //esta se llama desde el update()


        if (this.state != 'muerto'){

            if (this.numeroAleatorio < 40 ){
    

                //if (this.anims.currentAnim.key != 'lanzaCaja') {this.anims.stop()}
    
                this.anims.play("lanzaSobre", true); // animacion de Martin lanzando un sobre
    
    
                this.crearSobre(true, escena)
    
    
    
            }else {
    
                this.crearSobre(false, escena)
    
    
                super.actualizar(escena.jugador, this.compMartin)
    
            }

        }else{  //si Martin 'muere', no llamo a su animacion de 'morir', sino que se inician los dialogos finales del juego.


            escena.items4.dialogoFinal(escena)

        }



    
    }
    
    crearSobre(activado, escena) {
    
            if (this.sobreLanzado && activado == true){  // lanza el sobre cada x segundos, siempre y cuando activado sea true
    
                this.sobreLanzado = false
    
                var sobre= this.sobres.get(this.x, this.y); // creo el objeto sprite
    
                if (sobre) {
        
                    sobre.anims.create({  //creo la animacion
                        key: "sobre",  //nombre de la animacion
                        frames: sobre.anims.generateFrameNumbers("sobre"), //nombre del spritesheet
                        frameRate:20, 
                        repeat:-1 
        
                    });

                    //reproduzco la animacion
                    sobre.anims.play("sobre", true); //nombre de la animacion a reproducir


                    escena.physics.moveTo(sobre, escena.jugador.x, escena.jugador.y, 200); // mueve el gameobject hacia la posicion
                    //del jugador a la velocidad 200. Se lo llama al metodo una sola vez.

                    
                }
    
                
    
    
    
            }
    
    
        }
    
    
        
    
    }