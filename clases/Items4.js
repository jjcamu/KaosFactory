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

        this.scene.anims.create({
            key: "explosion",  //nombre de la animacion
            frames: this.scene.anims.generateFrameNumbers("explosion"), //nombre del spritesheet
            //frameRate:150, 
            repeat:0 ,
            duration: 700,
            hideOnComplete: true
        })

        this.escala = 0.5
 
/*         this.posY = 0
        this.banderaConfeti2 = true */

        this.confetis = escena.physics.add.group({defaultKey: 'confeti'})

    }

    dialogoInicial(escena){

        escena.enemigoUlla.anims.play("paradoEnemigo", true); 
        escena.enemigoEsteban.anims.play("paradoEnemigo", true);
        escena.enemigoMartin.anims.play("paradoEnemigo", true);


        if (escena.banderaGlobo1) { //se ingresa a este bloque UNA SOLA VEZ debido a la bandera 'banderaGlobo1'

            escena.physics.pause() // pauso las fisicas para impedir que se mueva el jugador y el enemigo

            // añado a la escena el primer globito del dialogo
            escena.spriteGlobo1 =escena.add.image(escena.jugador.x  + 40 * escena.items4.escala , escena.jugador.y - 430 * escena.items4.escala, 'globo1a').setOrigin(0, 0).setDepth(3).setScale(1.5 * escena.items4.escala)

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
            escena.spriteGlobo2 = escena.add.image(escena.enemigoMartin.x - 800 * escena.items4.escala , escena.enemigoMartin.y - 450 * escena.items4.escala, 'globo2a').setOrigin(0, 0).setDepth(3).setScale(1.5 * escena.items4.escala)

            escena.time.delayedCall(4000, finDialogo, [escena]); //timer que llamará a la funcion 'finDialogo' dentro de 4 seg.

        }

        function finDialogo(escena){ // se llamara a esta funcion SOLO UNA VEZ

            escena.spriteGlobo2.destroy() //elimino el segundo globito del dialogo

            cartelInicial(escena)

        }

        function cartelInicial(escena){


            let centrarX = escena.cameras.main.worldView.x + escena.cameras.main.width / 2;
            let centrarY = escena.cameras.main.worldView.y + escena.cameras.main.height / 2;
    
            escena.items4.cartelInicial = escena.items4.create(centrarX, centrarY , 'cartelInicial') . setScale(1.9 * escena.items4.escala).setDepth(3)
            escena.items4.botonAceptar = escena.items4.create(centrarX, centrarY + 170 * escena.items4.escala , 'aceptar') .setScale(1.9 * escena.items4.escala).setDepth(3)
    
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

        escena.cameras.main.stopFollow(escena.jugador) //la camara deja de seguir al jugador

        escena.cameras.main.pan(escena.enemigoMartin.x, escena.enemigoMartin.y, 1000); //muevo la camara a la posicion


        if (escena.banderaDialogo2) {  //pongo este condicional para que se ingrese solo una vez al bloque



            // añado a la escena el globo de dialogo
            escena.spriteGlobo3 = escena.add.image(escena.enemigoMartin.x - 50, escena.enemigoMartin.y - 500 * escena.items4.escala, 'globo3a').setOrigin(0, 0).setDepth(3).setScale(1.8 * escena.items4.escala)
    
            escena.time.delayedCall(6000, globo4, [escena]); 

            escena.banderaDialogo2 = false



        }



        function globo4(escena) { // se llamara a esta funcion SOLO UNA VEZ

            escena.spriteGlobo3.destroy()  //elimino el primer globito del dialogo

            //agrego el segundo globito
            escena.spriteGlobo4 = escena.add.image(escena.jugador.x - 840 * escena.items4.escala , escena.jugador.y - 420 * escena.items4.escala , 'globo4a').setOrigin(0, 0).setDepth(3).setScale(1.5 * escena.items4.escala)

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
    
            escena.items4.cartel = escena.items4.create(centrarX, centrarY , 'cartelFinal') . setScale(1.9 * escena.items4.escala).setDepth(3)
            escena.items4.botonAceptar = escena.items4.create(centrarX, centrarY + 170 * escena.items4.escala, 'aceptar') .setScale(1.9 * escena.items4.escala).setDepth(3)
    
            escena.items4.botonAceptar.setInteractive().on("pointerdown",function() {  
                

                escena.items4.cartel.destroy();
                escena.items4.botonAceptar.destroy();

                //se carga la pantalla final con la marcha

                escena.items4.pantallaFinal(escena, centrarX, centrarY)

    
            })
    
            escena.physics.pause()



        }





    }



    pantallaFinal(escena, centrarX, centrarY){

        escena.items4.create(centrarX, centrarY , 'pantallaFinal').setDepth(3)

        escena.time.addEvent({
            delay: 3000,                
            callback: this.crearConfeti,
            args: [escena, centrarX, centrarY],
            repeat: -1
        });

        escena.time.delayedCall(2000, () => {escena.add.sprite(centrarX, centrarY -148 , 'copa').setDepth(4)}, [escena]); //135 - 68 

        escena.time.delayedCall(3000, () => {escena.add.sprite(centrarX, centrarY - 75 , 'titulo1').setDepth(4)}, [escena]);

        escena.time.delayedCall(7000, () => {escena.add.sprite(centrarX, centrarY - 5 , 'titulo2').setDepth(4)}, [escena]);

        escena.time.delayedCall(13000, () => {escena.add.sprite(centrarX, centrarY + 30 , 'titulo3').setDepth(4)}, [escena]); 

        //escena.time.delayedCall(15000, this.reiniciaJuego , [escena]); 


        //si presiono en la pantalla, se reinicia el juego
        escena.input.on('pointerdown', function (pointer) { escena.items4.reiniciaJuego(escena)})

    }

    crearConfeti(escena, centrarX, centrarY){



        var confeti= escena.items4.confetis.get(centrarX, centrarY - 450); 

        if (confeti){


            confeti.setDepth(3)


            // muevo el confeti con un timer, debido a que los metodos 'setVelocity', o 'moveTo' no me dan bola
            escena.time.addEvent({
                delay: 100,                
                callback: moverConfeti,
                args: [confeti],
                repeat: -1
            });

        }

        function moverConfeti(confeti){  

            var posy = confeti.y
            posy = posy + 8
            confeti.setPosition(centrarX, posy) //368
        }

        if (confeti.y > 700){
            confeti.destroy()
        }


    }





    reiniciaJuego (escena){

        escena.scene.start('intro' ,  { gameOver: 'true'})
    }





    cartelAdministrativo(escena){

        let centrarX = escena.cameras.main.worldView.x + escena.cameras.main.width / 2;
        let centrarY = escena.cameras.main.worldView.y + escena.cameras.main.height / 2;

        this.cartel3 = this.create(centrarX, centrarY , 'cartelAdministrativo') . setScale(1.9 * escena.items4.escala).setDepth(3)
        this.botonAceptar = this.create(centrarX, centrarY + 170 * escena.items4.escala , 'aceptar') .setScale(1.9 * escena.items4.escala).setDepth(3)


        this.botonAceptar.setInteractive().on("pointerdown",function() {  
            
            escena.items4.cartel3.destroy()      
            escena.items4.botonAceptar.destroy(); 
            escena.physics.resume();


        })

        escena.physics.pause()

    }



}