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

            if ( that.sobreLanzado == true){

                that.sobreLanzado = false // lanza sobre cada x segundos
                
            }else {
                that.sobreLanzado = true
            }

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


            //colision de los sobres con el jugador
            if (escena.physics.overlap(this.sobres, escena.jugador.hitboxCuerpo, (jugador,sobre) => {
                
                this.explosion = escena.add.sprite(sobre.x ,sobre.y  , 'explosion').setScale(1.8 * this.escala);
                this.explosion.anims.play("explosion");
                this.scene.sound.play('explosion' , { volume: 8 })
                sobre.destroy()

            
            
            })){

                escena.jugador.vidas =  escena.jugador.vidas - 15 ;
    
                if (escena.jugador.vidas <= 0) {  //si las vidas llegaron a cero
                    escena.jugador.vidas = 0  // para que 'escena.jugador.vidas' no sea un valor negativo
                    escena.jugador.state = 'muerto'
                }else{
                    escena.jugador.anims.play('heridoAlto',true); 
                    //ejecuto directamente la animacion, en vez de cambiar el estado del jugador, porque cuando cambiaba el estado me daba error :P
                }
        
                escena.barrasVida.barraJugador.displayWidth = escena.jugador.vidas;
            }
    
            if (escena.physics.overlap(this.sobres, escena.paredes4 , (sobre, pared) => {sobre.destroy()})){}



        }else{  //si Martin 'muere', no llamo a su animacion de 'morir', sino que se inician los dialogos finales del juego.


            escena.items4.dialogoFinal(escena)

        }



    
    }
    
    crearSobre(activado, escena) {
    
            if (this.sobreLanzado && activado == true){  // lanza el sobre cada x segundos, siempre y cuando activado sea true
    
                this.sobreLanzado = false
    
                var sobre= this.sobres.get(this.x, this.y + 40); // creo el objeto sprite
    
                if (sobre) {

                    sobre.setScale( 0.4 * escena.escala).setDepth(2)
                    sobre.setSize(sobre.width/3,sobre.height/3)//.setOffset(gotaFuego.width/4, 40)
        
                    sobre.anims.create({  //creo la animacion
                        key: "sobre",  //nombre de la animacion
                        frames: sobre.anims.generateFrameNumbers("sobre"), //nombre del spritesheet
                        frameRate:15, 
                        repeat:-1 
        
                    });

                    //reproduzco la animacion
                    sobre.anims.play("sobre", true); //nombre de la animacion a reproducir

                   


                    escena.physics.moveTo(sobre, escena.jugador.x, escena.jugador.y, 150 ); // mueve el gameobject hacia la posicion
                    //del jugador a la velocidad 200. Se lo llama al metodo una sola vez.

                    
                }
    
                
    
    
    
            }
    
    
        }
    
    
        
    
    }