export default class Items2 extends Phaser.Physics.Arcade.Group {
    constructor(fisicas, escena) {
        super(fisicas, escena);


        this.pedos = escena.physics.add.group()
        this.pedo

        this.tanqueGlucosa = this.create(4100, 1400, 'tanque').setOrigin(0,0).setScale(1.5).setDepth(3) 
        this.tanqueGlucosa.body.setImmovable(true)

        this.moto = this.create(3397, 1500, 'moto').setOrigin(0,0).setScale(1.3).setSize(200,50).setOffset(0,150)
        //this.moto.body.setImmovable(true)

        this.carreta = this.create(2065, 896, 'carreta').setOrigin(0,0).setScale(2, 1.5).setSize(200,50).setOffset(50,125)
        //this.moto.body.setImmovable(true)

        this.tarima = this.create(6450, 1456, 'tarima').setOrigin(0,0).setScale(2 , 1.5).setSize(200,50).setDepth(-2) 
        this.tarima.body.setImmovable(true)

        this.tacho3a = this.create(6543, 1335, 'tacho3').setOrigin(0,0).setScale(1.5)//.setOffset(50,125)
        this.tacho3a.setSize(this.tacho3a.width,20).setOffset(0,this.tacho3a.height-20)
        this.tacho3a.body.setImmovable(true)

        this.tacho3b = this.create(6608, 1380, 'tacho3').setOrigin(0,0).setScale(1.5)//.setOffset(50,125)
        this.tacho3b.setSize(this.tacho3b.width,20).setOffset(0,this.tacho3b.height-20)
        this.tacho3b.body.setImmovable(true)

        this.tacho3c = this.create(6770, 1350, 'tacho3').setOrigin(0,0).setScale(1.5)//.setOffset(50,125)
        this.tacho3c.setSize(this.tacho3c.width,20).setOffset(0,this.tacho3c.height-20)
        this.tacho3c.body.setImmovable(true)

        this.columna = this.create(4553, -290, 'columna').setOrigin(0,0).setScale(2, 1.7).setDepth(2)
        this.columna.setSize(this.columna.width,20).setOffset(0,this.columna.height-20)
        this.columna.body.setImmovable(true)

        this.herramientas = this.create(4020, 323, 'herramientas').setOrigin(0,0).setSize(100,100).setScale(1.3)//.setOffset(50,125)
        this.herramientas.body.setImmovable(true)

        this.tacho1a = this.create(4713, 630, 'tacho1').setOrigin(0,0).setScale(1.3)
        this.tacho1a.setSize(this.tacho1a.width,50).setOffset(0,140)
        this.tacho1a.body.setImmovable(true)

        this.tacho1b = this.create(4638, 709, 'tacho1').setOrigin(0,0).setScale(1.3)
        this.tacho1b.setSize(this.tacho1b.width,50).setOffset(0,140)
        this.tacho1b.body.setImmovable(true)

        this.tacho2a = this.create(4800, 719, 'tacho2').setOrigin(0,0).setScale(1.5)
        this.tacho2a.setSize(this.tacho2a.width,50).setOffset(0,100)
        this.tacho2a.body.setImmovable(true)

        this.tacho2b = this.create(5830, 544, 'tacho2').setOrigin(0,0).setScale(1.5)
        this.tacho2b.setSize(this.tacho2b.width,50).setOffset(0,100)
        this.tacho2b.body.setImmovable(true)

        this.cortina1 = this.create(5991, 520, 'cortina1').setOrigin(0,0).setScale(1.7)
        this.cortina1.setSize(this.cortina1.width,20).setOffset(50,this.cortina1.height-20)
        this.cortina1.body.setImmovable(true)

        this.cortina2 = this.create(6410, 779, 'cortina2').setOrigin(0,0).setScale(1.7)
        this.cortina2.setSize(this.cortina2.width,20).setOffset(50,this.cortina2.height-70)
        this.cortina2.body.setImmovable(true)

        this.mosquitero = this.create(6300, 280, 'mosquitero').setOrigin(0,0).setScale(2, 1.7)
        this.mosquitero.body.setImmovable(true)

        this.matafuego = this.create(6636, 958, 'matafuego').setOrigin(0,0).setScale(1.5)
        this.matafuego.body.setImmovable(true)

        this.zorra = this.create(6017, 1339, 'zorra').setOrigin(0,0).setScale(1.5)
        this.zorra.setSize(this.zorra.width,50).setOffset(0,this.zorra.height-50)
        this.zorra.body.setImmovable(true)

        this.puertaTaller = this.create(2067, 250, 'puertaTaller').setScale(2, 1.7).setDepth(2)
        this.zorra.body.setImmovable(true)


 


    }




    crearPedo(escena){
        

        this.pedo = this.pedos.create(900, 800 , 'pedo')
        this.pedo.body.setSize(100, 100, 100, 100);

        if (this.pedo){

            this.pedo.anims.create({
                key: "pedo",  //nombre de la animacion
                frames: this.pedo.anims.generateFrameNumbers("pedo"), 
                frameRate:20, 
                repeat:-1 

            });

            this.pedo.anims.play('pedo', true)

            escena.physics.moveTo(this.pedo, 2200,2000, 200); // mueve el gameobject hacia el punto (x,y)
            // a la velocidad 200. Se lo llama al metodo una sola vez.

        }




    }

    inhalaPedo(hitBoxCuerpo, pedo){  
    //si el jugador se superpone a algun objeto del grupo 'pedos', se llama a esta funcion, la cual recibe como
    // parametro el objeto individual 'pedo' con el cual hubo superposición.
    // Si quisiera destruir al grupo de pedos, deberia escribir : this.pedos.destroy()
        pedo.destroy()


        this.jugador.vidas =  this.jugador.vidas - 60 ;

        if (this.jugador.vidas <= 0) {  //si las vidas llegaron a cero
            this.jugador.vidas = 0  // para que 'jugador.vidas' no sea un valor negativo
            this.jugador.state = 'muerto'
        }else{
            this.jugador.anims.play('heridoBajo',true); 
            //ejecuto directamente la animacion, en vez de cambiar el estado del jugador, porque cuando cambiaba el estado me daba error :P
        }

        this.barrasVida.barraJugador.displayWidth = this.jugador.vidas;
          


    }

    dialogoAriel(escena){  // se llamara a esta funcion mientras dure el dialogo con Ariel, osea mientras 'banderaDialogo' sea true


        escena.enemigo1.anims.play("caminarEnemigo", true); 

        escena.enemigo1.flipX = true

        //muevo el enemigo hacia el jugador (esta funcion de phaser, puede llamarse una sola vez o muchas veces,
        //y no modificará su funcionamiento)
        escena.physics.moveToObject(escena.enemigo1, escena.jugador, escena.enemigo1.velocidad);

        let distancia = Phaser.Math.Distance.BetweenPoints(escena.enemigo1, escena.jugador)



        if (distancia <= 400  ) {  

            escena.enemigo1.anims.play("paradoEnemigo", true); // coloco esta instruccion acá , para que sea llamada mientras
            // dure el dialogo, porque sino se ejecuta la animacion de 'caminar' del enemigo.



            if (escena.banderaGlobo1) { //se ingresa a este bloque UNA SOLA VEZ debido a la bandera 'banderaGlobo1'

                escena.physics.pause() // pauso las fisicas para impedir que se mueva el jugador y el enemigo

                // añado a la escena el primer globito del dialogo
                escena.spriteGlobo1 =escena.add.image(escena.enemigo1.x - 700, escena.enemigo1.y - 300, 'globo1').setOrigin(0, 0).setDepth(3)

                escena.time.delayedCall(4000, globo2, [escena]);  //añado un timer, el cual llamara a la funcion 'globo2' dentro 
                // de 4 segundos. Los argumentos se ingresan a la funcion 'globo2' por medio de un array. En este caso ingreso al array
                // el argumento 'escena'. 
                //Notese que invoco a este timer solo una vez, porque sino, una vez transcurrido los 4 seg. llamara a la funcion 'globo2'
                // reiteradas veces.
    
                escena.banderaGlobo1 = false; //prohibo el ingreso a este bloque

            }


        }
            

        function globo2(escena) { // se llamara a esta funcion SOLO UNA VEZ

            escena.spriteGlobo1.destroy()  //elimino el primer globito del dialogo

            //agrego el segundo globito
            escena.spriteGlobo2 = escena.add.image(escena.jugador.x , escena.jugador.y - 500, 'globo2').setOrigin(0, 0).setDepth(3)

            escena.time.delayedCall(4000, finDialogo, [escena]); //timer que llamará a la funcion 'finDialogo' dentro de 4 seg.

        }

        function finDialogo(escena){ // se llamara a esta funcion SOLO UNA VEZ

            escena.spriteGlobo2.destroy() //elimino el segundo globito del dialogo

            escena.physics.resume(); //reanudo las fisicas para que puedan moverse el jugador y el enemigo

            escena.banderaDialogo = false  //finalizo el dialogo con el enemigo, para que éste pueda recuperar su comportamiento normal.


        }
        
        
        
    }

    aparicionHernan(escena){



        escena.jugador.setVelocity(0) //detengo al jugador


        if (escena.banderaCamara == true) {

            escena.cameras.main.stopFollow(escena.jugador) //la camara deja de seguir al jugador

            escena.cameras.main.pan(2540, 580, 1000); //muevo la camara a la posicion 2540, 580 en 1000ms (lugar donde aparece hernan)

            escena.banderaCamara = false
        }


        escena.time.delayedCall(2000, caminarHernan, [escena]); //espero 2 segundos

        function caminarHernan(escena){

            if (escena.enemigo1.x < 2580){

                escena.enemigo1.anims.play("caminarEnemigo", true); 

                escena.physics.moveTo(escena.enemigo1, 2590,  224, 150); // camina hernan hacia el costado

            }else{

                if (escena.banderaHernan2 == true){

                    
                    escena.enemigo1.anims.play("paradoEnemigo", true); //mira hacia el frente

                    escena.enemigo1.setVelocity(0) //deja de caminar

                    escena.banderaHernan2 = false

                }

                escena.time.delayedCall(2000, saltoHernan, [escena]);// espera 2 segundos

            }
        }


        function saltoHernan(escena){

           
            escena.enemigo1.anims.pause(escena.enemigo1.anims.anims.entries.caminarEnemigo.frames[0]);
            //pauso la animacion en un frame determinado (es un frame que da la impresion de salto)
            
            if (escena.enemigo1.y > 190 && escena.banderaHernan3 == true){

                escena.enemigo1.setVelocityY(-300) //sube
            }
            else if (escena.enemigo1.y < 1300){

                escena.banderaHernan3 = false

                escena.enemigo1.setVelocityY(600) // y despues baja

            }else{


                escena.enemigo1.setVelocity(0) // detengo la animacion de hernan (toca el piso)

                escena.enemigo1.anims.play("paradoEnemigo", true); 

            }

            if (escena.enemigo1.y > 350 && escena.banderaHernan4 == true ){




                if (escena.banderaCamara2) {
                    
                    escena.cameras.main.pan(2540, 1100, 700)
                
                    escena.banderaCamara2 = false

                }
 

                if (escena.banderaDialogoHernan == true){  // bandera para llamar solo una vez al dialogo


                    escena.time.delayedCall(3000, dialogoHernan, [escena]);

                    escena.banderaDialogoHernan = false 

                }


            }

        } 

        function dialogoHernan(escena){

            escena.spriteGlobo1 =escena.add.image(escena.enemigo1.x  - 600, escena.enemigo1.y  - 450, 'globo3').setOrigin(0, 0).setDepth(3)

            escena.time.delayedCall(4000, moverCamara, [escena]);

        }

        function moverCamara(escena){

            escena.spriteGlobo1.destroy()  //elimino el primer globito del dialogo

            escena.cameras.main.pan(escena.jugador.x, escena.jugador.y, 1000); //muevo la camara a la posicion

            escena.time.delayedCall(1500, globo2, [escena]);  
        }

        function globo2(escena) { // se llamara a esta funcion SOLO UNA VEZ

            

            //agrego el segundo globito
            escena.spriteGlobo2 = escena.add.image(escena.jugador.x + 40  , escena.jugador.y - 430 , 'globo4').setOrigin(0, 0).setDepth(3)

            escena.time.delayedCall(4000, finalizar, [escena]); //timer que llamará a la funcion 'finDialogo' dentro de 4 seg.

        }

        function finalizar(escena){


            //escena.cameras.main.pan(escena.jugador.x, escena.jugador.y, 800)

            //if (escena.cameras.main._scrollX > 1975){ //si el foco de la camara volvió al jugador..
                escena.spriteGlobo2.destroy()  

                escena.cameras.main.startFollow(escena.jugador)
                escena.banderaHernan = false
                escena.banderaHernan4 = false

                escena.enemigo1.body.checkCollision.none = false;

            //}

        }

    }

    dialogoFacu(escena){  // se llamara a esta funcion mientras dure el dialogo con Ariel, osea mientras 'banderaDialogo' sea true


    escena.enemigo1.anims.play("caminarEnemigo", true); 


    //muevo el enemigo hacia el jugador (esta funcion de phaser, puede llamarse una sola vez o muchas veces,
    //y no modificará su funcionamiento)
    escena.physics.moveToObject(escena.enemigo1, escena.jugador, escena.enemigo1.velocidad);

    let distancia = Phaser.Math.Distance.BetweenPoints(escena.enemigo1, escena.jugador)



    if (distancia <= 300  ) {  

        escena.enemigo1.anims.play("paradoEnemigo", true); // coloco esta instruccion acá , para que sea llamada mientras
        // dure el dialogo, porque sino se ejecuta la animacion de 'caminar' del enemigo.



        if (escena.banderaGlobo1) { //se ingresa a este bloque UNA SOLA VEZ debido a la bandera 'banderaGlobo1'

            escena.physics.pause() // pauso las fisicas para impedir que se mueva el jugador y el enemigo

            // añado a la escena el primer globito del dialogo
            escena.spriteGlobo1 =escena.add.image(escena.enemigo1.x - 700, escena.enemigo1.y - 300, 'globo1').setOrigin(0, 0).setDepth(3)

            escena.time.delayedCall(4000, globo2, [escena]);  //añado un timer, el cual llamara a la funcion 'globo2' dentro 
            // de 4 segundos. Los argumentos se ingresan a la funcion 'globo2' por medio de un array. En este caso ingreso al array
            // el argumento 'escena'. 
            //Notese que invoco a este timer solo una vez, porque sino, una vez transcurrido los 4 seg. llamara a la funcion 'globo2'
            // reiteradas veces.

            escena.banderaGlobo1 = false; //prohibo el ingreso a este bloque

        }


    }
        

    function globo2(escena) { // se llamara a esta funcion SOLO UNA VEZ

        escena.spriteGlobo1.destroy()  //elimino el primer globito del dialogo

        //agrego el segundo globito
        escena.spriteGlobo2 = escena.add.image(escena.jugador.x , escena.jugador.y - 500, 'globo2').setOrigin(0, 0).setDepth(3)

        escena.time.delayedCall(4000, finDialogo, [escena]); //timer que llamará a la funcion 'finDialogo' dentro de 4 seg.

    }

    function finDialogo(escena){ // se llamara a esta funcion SOLO UNA VEZ

        escena.spriteGlobo2.destroy() //elimino el segundo globito del dialogo

        escena.physics.resume(); //reanudo las fisicas para que puedan moverse el jugador y el enemigo

        escena.banderaDialogoFacu = false  //finalizo el dialogo con el enemigo, para que éste pueda recuperar su comportamiento normal.


    }
}







}