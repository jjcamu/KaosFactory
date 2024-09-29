import Enemigo from "./Enemigo.js";

export default class Hernan extends Enemigo {


    

    


    constructor(escena, x, y, spriteSheet, indice) {
        super(escena, x, y, spriteSheet, indice); 

        this.compHernan = {

            pinia : [0,5] ,
            patada : [6,10] 
        }

        this.numeroAleatorio = 0
        this.poderEnCurso = false

        this.gotasDeFuego = escena.physics.add.group({defaultKey: 'gotaFuego'}) // creo un grupo de sprites con fisica, conformado
        // por imagenes 'gotaFuego'    

        this.gotaHabilitada = false

        this.banderaOscurecer = true

        this.oscuridad = escena.add.image(0, 0, 'oscuridad').setOrigin(0, 0).setScale(2, 1.7).setDepth(1);

        this.oscuridad.alpha = 0 // transparencia total

        this.movimiento = 5 // movimiento del temblor

        this.cargarAnimacionesHernan(spriteSheet);   //cargo las animaciones que solo corresponder a hernan

        this.vidas = 300  //sobreescribo las vidas de Hernan, para que tenga mas vidas que el enemigo comun

    }




    cargarAnimacionesHernan(spriteSheet) {

        this.anims.create({
            key: "rezaHernan", 
            frames: this.anims.generateFrameNumbers(spriteSheet,{frames:[98]}), 
            frameRate:15, 
            repeat:0 
        });


}

    cargarTimerHernan(escena){  //esta funcion se llama desde el create() de la escena
  
        this.timerHernan = escena.time.addEvent({
            delay: 3000,                // cada 3 segundos se llamará a la funcion 'mostrarAleatorio' 
            callback: mostrarAleatorio,
            args: [this],  //envio como argumento de la funcion, el objeto 'hernan'
            repeat: -1
        });

        function mostrarAleatorio(that){ // cada 3 segundos se llama a esta funcion, y esos 3 segundos sera la duracion 
                                        //del poder (si el poder es invocado 2 veces seguidas, durará 6 segundos)
                                        //Uso el nombre 'that' para no usar 'this', ya que esta ultima es una palabra reservada



            that.numeroAleatorio = Phaser.Math.Between(0, 100)
            
        }

        this.timerGota = escena.time.addEvent({
            delay: 500,                
            callback: habilitarGota,
            args: [this],
            repeat: -1
        });

        function habilitarGota(that){


            that.gotaHabilitada = true // habilito gota cada medio segundo
            
        }

    }

    actualizarHernan(escena){ //esta se llama desde el update()


        if (this.numeroAleatorio < 40 && this.state != 'muerto'){

            // hernan rezando- cuando lo golpeas no le pasa nada. 
            if (this.anims.currentAnim.key != 'rezaHernan') {this.anims.stop()}

            this.anims.play("rezaHernan", true); // aca deberia estar la animacion de hernan rezando

            this.setImmovable(true);  //el sprite del enemigo se vuelve inmovil, no puede empujarse
            this.setVelocityX(0); // detengo el movimiento 


            this.generarTemblor(true, escena)

            this.oscurecer(true, escena)

            this.lluviaDeFuego(escena)


        }else {

            this.generarTemblor(false, escena)

            this.oscurecer(false, escena)

            super.actualizar(escena.jugador, this.compHernan)

        }



        if (escena.physics.overlap(this.gotasDeFuego, escena.jugador.hitboxCuerpo, (jugador,gota) => {gota.destroy()})){
            // si alguna gota de fuego toca al jugador, se destruye la gota y ademas..


            escena.jugador.vidas =  escena.jugador.vidas - 40 ;

            if (escena.jugador.vidas <= 0) {  //si las vidas llegaron a cero
                escena.jugador.vidas = 0  // para que 'escena.jugador.vidas' no sea un valor negativo
                escena.jugador.state = 'muerto'
            }else{
                escena.jugador.anims.play('heridoBajo',true); 
                //ejecuto directamente la animacion, en vez de cambiar el estado del jugador, porque cuando cambiaba el estado me daba error :P
            }
    
            escena.barrasVida.barraJugador.displayWidth = escena.jugador.vidas;
        }

        if (escena.physics.overlap(this.gotasDeFuego, [escena.paredes2.pared_abajo, escena.paredes2.pared_abajo2 ], (pared, gota) => {gota.destroy()})){}
        // destruyo la gota al colisionar con las paredes inferiores del escenario (para ahorrar memoria)


    }

    lluviaDeFuego(escena) {

        if (this.gotaHabilitada){

            this.gotaHabilitada = false

            var gotaFuego= this.gotasDeFuego.get(Phaser.Math.Between(escena.jugador.x - escena.cameras.main.width/2, escena.jugador.x + escena.cameras.main.width/2 ), 300);

            if (gotaFuego) {
    
                gotaFuego.anims.create({
                    key: "gotaFuego",  //nombre de la animacion
                    frames: gotaFuego.anims.generateFrameNumbers("gotaFuego"), 
                    frameRate:20, 
                    repeat:-1 
    
                });
    
                gotaFuego.anims.play("gotaFuego", true); 
                gotaFuego.setVelocityY(400 * escena.escala).setScale(2 * escena.escala).setDepth(2);
                gotaFuego.setSize(gotaFuego.width/3,gotaFuego.height/4).setOffset(gotaFuego.width/4, 40)



            }

            



        }


    }

    generarTemblor(activado, escena) {


        this.timerTemblor = escena.time.addEvent({
            delay: 50,                
            callback: temblor,
            args: [activado, this],
            repeat: -1
        });

        function temblor(activado, that){  

            if (activado == true){  

                that.movimiento = -(that.movimiento)

                escena.cameras.main.setFollowOffset(0, that.movimiento)    //entonces hay temblor


            }else{
                escena.cameras.main.setFollowOffset(0, 0)  //no hay temblor
            }

        }

    }



    oscurecer(activado, escena){  //oscurecer el escenario

        this.timerOscuridad = escena.time.addEvent({
            delay: 50,                
            callback: oscuridad,
            args: [activado, this],
            repeat: -1
        });


        function oscuridad(activado, that){  

            if (activado == true){

                if (that.oscuridad.alpha < 0.5){

                    that.oscuridad.alpha = that.oscuridad.alpha + 0.1

                }

            }else{

                if (that.oscuridad.alpha > 0 ){

                    that.oscuridad.alpha = that.oscuridad.alpha - 0.1

                }
             
            }

        }

    }


    

}
