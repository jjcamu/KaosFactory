export default class Items4 extends Phaser.Physics.Arcade.Group {
    constructor(fisicas, escena) {
        super(fisicas, escena);





        this.sillon = this.create(520, 310, 'sillon').setOrigin(0,0).setScale(1.5,1.5).setSize(80,20).setOffset(10,110)
        this.sillon.body.setImmovable(true)

        this.mesa = this.create(500, 430, 'mesa').setOrigin(0,0).setScale(1.3,1.3).setSize(300,50).setOffset(30,130)
        this.mesa.body.setImmovable(true)

        this.silla1 = this.create(1120, 418, 'silla').setOrigin(0,0).setScale(1.5,1.5).setSize(80,20).setOffset(10,110)
        this.silla1.body.setImmovable(true)

        this.silla2 = this.create(1390, 708, 'silla').setOrigin(0,0).setScale(1.5,1.5).setSize(80,20).setOffset(10,110)
        this.silla2.body.setImmovable(true)

        


 


    }

    dialogoInicial(escena){

        escena.enemigoUlla.anims.play("paradoEnemigo", true); 
        escena.enemigoEsteban.anims.play("paradoEnemigo", true);
        escena.enemigoMartin.anims.play("paradoEnemigo", true);


        if (escena.banderaGlobo1) { //se ingresa a este bloque UNA SOLA VEZ debido a la bandera 'banderaGlobo1'

            escena.physics.pause() // pauso las fisicas para impedir que se mueva el jugador y el enemigo

            // añado a la escena el primer globito del dialogo
            escena.spriteGlobo1 =escena.add.image(escena.jugador.x  + 40, escena.jugador.y - 430, 'globo1a').setOrigin(0, 0).setDepth(3)

            escena.time.delayedCall(4000, moverCamara, [escena]);  //añado un timer, el cual llamara a la funcion 'globo2' dentro 
            // de 4 segundos. Los argumentos se ingresan a la funcion 'globo2' por medio de un array. En este caso ingreso al array
            // el argumento 'escena'. 
            //Notese que invoco a este timer solo una vez, porque sino, una vez transcurrido los 4 seg. llamara a la funcion 'globo2'
            // reiteradas veces.

            escena.banderaGlobo1 = false; //prohibo el ingreso a este bloque

        }


        function moverCamara(escena){

            escena.spriteGlobo1.destroy()  //elimino el primer globito del dialogo

            escena.cameras.main.stopFollow(escena.jugador) //la camara deja de seguir al jugador

            escena.cameras.main.pan(escena.enemigoMartin.x, escena.enemigoMartin.y, 1000); //muevo la camara a la posicion

            escena.time.delayedCall(1500, globo2, [escena]);  
            
        }

        function globo2(escena) { // se llamara a esta funcion SOLO UNA VEZ

            

            //agrego el segundo globito
            escena.spriteGlobo2 = escena.add.image(escena.enemigoMartin.x - 600 , escena.enemigoMartin.y - 450 , 'globo2a').setOrigin(0, 0).setDepth(3)

            escena.time.delayedCall(4000, finDialogo, [escena]); //timer que llamará a la funcion 'finDialogo' dentro de 4 seg.

        }

        function finDialogo(escena){ // se llamara a esta funcion SOLO UNA VEZ

            escena.spriteGlobo2.destroy() //elimino el segundo globito del dialogo

            cartelInicial(escena)

        }

        function cartelInicial(escena){


            let centrarX = escena.cameras.main.worldView.x + escena.cameras.main.width / 2;
            let centrarY = escena.cameras.main.worldView.y + escena.cameras.main.height / 2;
    
            escena.items4.cartelInicial = escena.items4.create(centrarX, centrarY , 'cartelInicial') . setScale(1.9).setDepth(3)
            escena.items4.botonAceptar = escena.items4.create(centrarX, centrarY + 170 , 'aceptar') .setScale(1.9).setDepth(3)
    
            escena.items4.botonAceptar.setInteractive().on("pointerdown",function() {  
                

                escena.items4.cartelInicial.destroy();
                escena.items4.botonAceptar.destroy();

                escena.cameras.main.startFollow(escena.jugador)  //devuelvo el foco de la camara a mi jugador

                escena.physics.resume(); //reanudo las fisicas para que puedan moverse el jugador y el enemigo
    
                escena.banderaDialogo = false  //finalizo el dialogo con el enemigo, para que éste pueda recuperar su comportamiento normal.
            
    
    
            })
        }

    }

    dialogoFinal(escena){

        escena.enemigoMartin.anims.play("paradoEnemigo", true);
        escena.enemigoEsteban.anims.pause()
        escena.enemigoUlla.anims.pause()

        escena.physics.pause() // pauso las fisicas para impedir que se mueva el jugador y el enemigo

        if (escena.banderaDialogo2) {  //pongo este condicional para que se ingrese solo una vez al bloque



            // añado a la escena el globo de dialogo
            escena.spriteGlobo3 = escena.add.image(escena.enemigoMartin.x + 40 , escena.enemigoMartin.y - 430, 'globo3a').setOrigin(0, 0).setDepth(3)
    
            escena.time.delayedCall(4000, globo4, [escena]); 

            escena.banderaDialogo2 = false



        }

        function globo4(escena) { // se llamara a esta funcion SOLO UNA VEZ

            escena.spriteGlobo3.destroy()  //elimino el primer globito del dialogo

            //agrego el segundo globito
            escena.spriteGlobo4 = escena.add.image(escena.jugador.x - 600 , escena.jugador.y - 450 , 'globo2a').setOrigin(0, 0).setDepth(3)

            escena.time.delayedCall(4000, finDialogo2, [escena]); //timer que llamará a la funcion 'finDialogo' dentro de 4 seg.

        }

        function finDialogo2(escena){ // se llamara a esta funcion SOLO UNA VEZ

            escena.spriteGlobo4.destroy() //elimino el segundo globito del dialogo

            //cartel de victoria!!

            cartelFinal(escena)

        }

        function cartelFinal(escena){

            let centrarX = escena.cameras.main.worldView.x + escena.cameras.main.width / 2;
            let centrarY = escena.cameras.main.worldView.y + escena.cameras.main.height / 2;
    
            escena.items4.cartel = escena.items4.create(centrarX, centrarY , 'cartelFinal') . setScale(1.9).setDepth(3)
            escena.items4.botonAceptar = escena.items4.create(centrarX, centrarY + 170 , 'aceptar') .setScale(1.9).setDepth(3)
    
            escena.items4.botonAceptar.setInteractive().on("pointerdown",function() {  
                

                escena.items4.cartel.destroy();
                escena.items4.botonAceptar.destroy();

                //se carga la pantalla final con la marcha
                escena.items4.cartel2 = escena.items4.create(centrarX, centrarY , 'pantallaFinal') . setScale(4).setDepth(3)

                escena.time.delayedCall(8000, juegoFinalizado, [escena]); //se llama la pantalla de juego finalizado
    
            })
    
            escena.physics.pause()



        }

        function juegoFinalizado (escena){

            escena.items4.cartel2.destroy();

            let centrarX = escena.cameras.main.worldView.x + escena.cameras.main.width / 2;
            let centrarY = escena.cameras.main.worldView.y + escena.cameras.main.height / 2;

            escena.items4.gameOver = escena.items4.create(centrarX, centrarY , 'gameOver') . setScale(3).setDepth(3)
            // cartel que muestre 'Señor operario: El juego ha finalizado, vuelva a su trabajo.'


            escena.time.delayedCall(4000, reiniciaJuego, [escena]); //funcion para reiniciar el juego

        }

        function reiniciaJuego (escena){

            escena.scene.start('intro' ,  { gameOver: 'true'})
        }


    }

    cartelAdministrativo(escena){

        let centrarX = escena.cameras.main.worldView.x + escena.cameras.main.width / 2;
        let centrarY = escena.cameras.main.worldView.y + escena.cameras.main.height / 2;

        this.cartel3 = this.create(centrarX, centrarY , 'cartelAdministrativo') . setScale(1.9).setDepth(3)
        this.botonAceptar = this.create(centrarX, centrarY + 170 , 'aceptar') .setScale(1.9).setDepth(3)


        this.botonAceptar.setInteractive().on("pointerdown",function() {  
            
            escena.items4.cartel3.destroy()      
            escena.items4.botonAceptar.destroy(); 
            escena.physics.resume();


        })

        escena.physics.pause()

    }

}