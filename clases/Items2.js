export default class Items2 extends Phaser.Physics.Arcade.Group {
    constructor(fisicas, escena) {
        super(fisicas, escena);


        this.pedos = escena.physics.add.group()
        this.pedo

        this.tanqueGlucosa = this.create(4100, 1400, 'tanque').setOrigin(0,0).setScale(1.5).setDepth(3) 
        this.tanqueGlucosa.body.setImmovable(true)

        this.moto = this.create(3397, 1600, 'moto').setOrigin(0,0).setScale(1.3).setSize(200,50).setOffset(0,150)
        this.moto.setState(3) //hago que sea un objeto rompible
    
        this.bici = this.create(850, 1650, 'bici').setOrigin(0,0).setScale(0.35)
        this.bici.setSize(this.bici.width - 50,150).setOffset(80,this.bici.height-200).setFlipX(true)
        this.bici.setState(3) //hago que sea un objeto rompible

        this.tarima = this.create(6450, 1456, 'tarima').setOrigin(0,0).setScale(2 , 1.5).setSize(200,50).setDepth(-2) 
        this.tarima.body.setImmovable(true)

        this.tacho3a = this.create(6543, 1335, 'tacho3').setOrigin(0,0).setScale(1.5)//.setOffset(50,125)
        this.tacho3a.setSize(this.tacho3a.width,20).setOffset(0,this.tacho3a.height-20)
        this.tacho3a.body.setImmovable(true)
        this.tacho3a.setState(3)

        this.tacho3b = this.create(6608, 1380, 'tacho3').setOrigin(0,0).setScale(1.5)//.setOffset(50,125)
        this.tacho3b.setSize(this.tacho3b.width,20).setOffset(0,this.tacho3b.height-20)
        this.tacho3b.body.setImmovable(true)
        this.tacho3b.setState(3)

        this.tacho3c = this.create(6770, 1350, 'tacho3').setOrigin(0,0).setScale(1.5)//.setOffset(50,125)
        this.tacho3c.setSize(this.tacho3c.width,20).setOffset(0,this.tacho3c.height-20)
        this.tacho3c.body.setImmovable(true)
        this.tacho3c.setState(3)

        this.columna = this.create(4553, -290, 'columna').setOrigin(0,0).setScale(2, 1.7).setDepth(2)
        this.columna.setSize(this.columna.width,20).setOffset(0,this.columna.height-20)
        this.columna.body.setImmovable(true)

        this.herramientas = this.create(4020, 323, 'herramientas').setOrigin(0,0).setSize(100,100).setScale(1.3)//.setOffset(50,125)
        this.herramientas.body.setImmovable(true)

        this.tacho1a = this.create(4713, 630, 'tacho1').setOrigin(0,0).setScale(1.3)
        this.tacho1a.setSize(this.tacho1a.width,50).setOffset(0,140)
        this.tacho1a.body.setImmovable(true)
        this.tacho1a.setState(3)
        this.tacho1a.name = 'juju'

        this.tacho1b = this.create(4638, 709, 'tacho1').setOrigin(0,0).setScale(1.3)
        this.tacho1b.setSize(this.tacho1b.width,50).setOffset(0,140)
        this.tacho1b.body.setImmovable(true)
        this.tacho1b.setState(3)

        this.tacho2a = this.create(4800, 719, 'tacho2').setOrigin(0,0).setScale(1.5)
        this.tacho2a.setSize(this.tacho2a.width,50).setOffset(0,100)
        this.tacho2a.body.setImmovable(true)
        this.tacho2a.setState(3)
        this.tacho2a.name = 'tienePollo'  //indico que es el tacho que guarda un pollo

        this.tacho2b = this.create(5830, 544, 'tacho2').setOrigin(0,0).setScale(1.5)
        this.tacho2b.setSize(this.tacho2b.width,50).setOffset(0,100)
        this.tacho2b.body.setImmovable(true)
        this.tacho2b.setState(3)

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
        this.matafuego.setState(3)
        this.matafuego.name = 'haceDanio'  //indico que el matafuego hace daño al destruirlo

        this.puertaTaller = this.create(2067, 250, 'puertaTaller').setScale(2, 1.7).setDepth(2)
        this.puertaTaller.body.setImmovable(true)


        this.zorra = this.create(3755, 776, 'zorra').setOrigin(0,0).setScale(1.5).setDepth(2).setFlipX(true)
        this.zorra.setSize(50,this.zorra.height/3).setOffset(50,this.zorra.height-this.zorra.height/3)

        this.carreta = this.create(2065, 896, 'carreta').setOrigin(0,0).setScale(2, 1.5).setSize(200,50).setOffset(50,125).setDepth(2) 
        this.carreta.setState(3)


        this.scene.anims.create({
            key: "explosion2",  //nombre de la animacion
            frames: this.scene.anims.generateFrameNumbers("explosion2"), //nombre del spritesheet
            //frameRate:150, 
            repeat:0 ,
            duration: 700,
            hideOnComplete: true
        })

        this.scene.anims.create({
            key: "pollo",  //nombre de la animacion
            frames: this.scene.anims.generateFrameNumbers("pollo"), //nombre del spritesheet
            frameRate:10, 
            repeat:-1 ,

        })

        this.scene.anims.create({
            key: "sombra",  //nombre de la animacion
            frames: this.scene.anims.generateFrameNumbers("sombra"), //nombre del spritesheet
            frameRate: 10,
            repeat: -1
        });

        this.escala = 0.5
    }




    crearPedo(escena){
        

        this.pedo = this.pedos.create(900 * this.escala, 800 * this.escala , 'pedo'). setScale(1 * this.escala)
        this.pedo.body.setSize(100 * this.escala, 100 * this.escala, 100 * this.escala, 100 * this.escala);

        if (this.pedo){

            this.pedo.anims.create({
                key: "pedo",  //nombre de la animacion
                frames: this.pedo.anims.generateFrameNumbers("pedo"), 
                frameRate:20, 
                repeat:-1 

            });

            this.pedo.anims.play('pedo', true)

            escena.physics.moveTo(this.pedo, 2200 * this.escala,2000 * this.escala, 200 * this.escala); // mueve el gameobject hacia el punto (x,y)
            // a la velocidad 200. Se lo llama al metodo una sola vez.

        }




    }

    inhalaPedo(hitBoxCuerpo, pedo){  
    //si el jugador se superpone a algun objeto del grupo 'pedos', se llama a esta funcion, la cual recibe como
    // parametro el objeto individual 'pedo' con el cual hubo superposición.
    // Si quisiera destruir al grupo de pedos, deberia escribir : this.pedos.destroy()
        pedo.destroy()
        this.sound.play('tos', { volume: 3 })

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



        if (distancia <= 400 * this.escala ) {  

            escena.enemigo1.anims.play("paradoEnemigo", true); // coloco esta instruccion acá , para que sea llamada mientras
            // dure el dialogo, porque sino se ejecuta la animacion de 'caminar' del enemigo.



            if (escena.banderaGlobo1) { //se ingresa a este bloque UNA SOLA VEZ debido a la bandera 'banderaGlobo1'

                escena.physics.pause() // pauso las fisicas para impedir que se mueva el jugador y el enemigo

                // añado a la escena el primer globito del dialogo
                escena.spriteGlobo1 =escena.add.image(escena.enemigo1.x - 950 * this.escala, escena.enemigo1.y - 400 * this.escala, 'globo1').setOrigin(0, 0).setScale(1.5 * this.escala).setDepth(3)

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
            escena.spriteGlobo2 = escena.add.image(escena.jugador.x , escena.jugador.y - 500 * escena.items2.escala, 'globo2').setOrigin(0, 0).setScale(1.5 * escena.items2.escala).setDepth(3)

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

            escena.cameras.main.pan(2540 * this.escala, 580 * this.escala, 1000); //muevo la camara a la posicion 2540, 580 en 1000ms (lugar donde aparece hernan)

            escena.banderaCamara = false
        }


        escena.time.delayedCall(2000, caminarHernan, [escena]); //espero 2 segundos

        function caminarHernan(escena){

            if (escena.enemigo1.x < 2580 * escena.items2.escala){

                escena.enemigo1.anims.play("caminarEnemigo", true); 

                escena.physics.moveTo(escena.enemigo1, 2590 * escena.items2.escala,  105, 150 * escena.items2.escala); // camina hernan hacia el costado

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
            
            if (escena.enemigo1.y > 190 * escena.items2.escala && escena.banderaHernan3 == true){

                escena.enemigo1.setVelocityY(-300 * escena.items2.escala) //sube
            }
            else if (escena.enemigo1.y < 1300 * escena.items2.escala){

                escena.banderaHernan3 = false

                escena.enemigo1.setVelocityY(600 * escena.items2.escala) // y despues baja

            }else{


                escena.enemigo1.setVelocity(0) // detengo la animacion de hernan (toca el piso)

                escena.enemigo1.anims.play("paradoEnemigo", true); 

            }

            if (escena.enemigo1.y > 350 * escena.items2.escala && escena.banderaHernan4 == true ){




                if (escena.banderaCamara2) {
                    
                    escena.cameras.main.pan(2540 * escena.items2.escala, 1100 * escena.items2.escala, 700)
                
                    escena.banderaCamara2 = false

                }
 

                if (escena.banderaDialogoHernan == true){  // bandera para llamar solo una vez al dialogo


                    escena.time.delayedCall(3000, dialogoHernan, [escena]);

                    escena.banderaDialogoHernan = false 

                }


            }

        } 

        function dialogoHernan(escena){

            escena.spriteGlobo1 =escena.add.image(escena.enemigo1.x  - 850 * escena.items2.escala, escena.enemigo1.y  - 500 * escena.items2.escala, 'globo3').setOrigin(0, 0).setScale(1.5 * escena.items2.escala).setDepth(3)

            escena.time.delayedCall(4000, moverCamara, [escena]);

        }

        function moverCamara(escena){

            escena.spriteGlobo1.destroy()  //elimino el primer globito del dialogo

            escena.cameras.main.pan(escena.jugador.x, escena.jugador.y, 1000); //muevo la camara a la posicion

            escena.time.delayedCall(1500, globo2, [escena]);  
        }

        function globo2(escena) { // se llamara a esta funcion SOLO UNA VEZ

            

            //agrego el segundo globito
            escena.spriteGlobo2 = escena.add.image(escena.jugador.x + 20 * escena.items2.escala , escena.jugador.y - 500 * escena.items2.escala, 'globo4').setOrigin(0, 0).setScale(1.5 * escena.items2.escala).setDepth(3)

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



    if (distancia <= 300 * escena.items2.escala ) {  

        escena.enemigo1.anims.play("paradoEnemigo", true); // coloco esta instruccion acá , para que sea llamada mientras
        // dure el dialogo, porque sino se ejecuta la animacion de 'caminar' del enemigo.



        if (escena.banderaGlobo1) { //se ingresa a este bloque UNA SOLA VEZ debido a la bandera 'banderaGlobo1'

            escena.physics.pause() // pauso las fisicas para impedir que se mueva el jugador y el enemigo
            //escena.jugador.setVelocity(0) //detengo al jugador

            escena.banderaGlobo1 = false; //prohibo el ingreso a este bloque

            escena.cameras.main.stopFollow(escena.jugador)

            moverCamara2(escena)






        }


    }

    function moverCamara2(escena){

        escena.cameras.main.pan(escena.enemigo1.x, escena.enemigo1.y, 1000); //muevo la camara a la posicion

        escena.time.delayedCall(1500, globo5, [escena]);  
    }

    function globo5(escena){

        // añado a la escena el primer globito del dialogo
        escena.spriteGlobo1 =escena.add.image(escena.enemigo1.x , escena.enemigo1.y - 450 * escena.items2.escala, 'globo5').setOrigin(0, 0).setScale(1.5 * escena.items2.escala).setDepth(3)

        escena.time.delayedCall(4000, moverCamara3, [escena]);  
    }

    function moverCamara3(escena){

        escena.spriteGlobo1.destroy()  //elimino el primer globito del dialogo

        escena.cameras.main.pan(escena.jugador.x, escena.jugador.y, 1000); //muevo la camara a la posicion

        escena.time.delayedCall(1500, globo6, [escena]);  
    }
        

    function globo6(escena) { // se llamara a esta funcion SOLO UNA VEZ

        

        //agrego el segundo globito
        escena.spriteGlobo2 = escena.add.image(escena.jugador.x , escena.jugador.y - 500 * escena.items2.escala, 'globo6').setOrigin(0, 0).setScale(1.5 * escena.items2.escala).setDepth(3)

        escena.time.delayedCall(4000, finDialogo, [escena]); //timer que llamará a la funcion 'finDialogo' dentro de 4 seg.

    }

    function finDialogo(escena){ // se llamara a esta funcion SOLO UNA VEZ

        escena.cameras.main.startFollow(escena.jugador)

        escena.spriteGlobo2.destroy() //elimino el segundo globito del dialogo

        escena.physics.resume(); //reanudo las fisicas para que puedan moverse el jugador y el enemigo

        escena.banderaDialogoFacu = false  //finalizo el dialogo con el enemigo, para que éste pueda recuperar su comportamiento normal.


    }
}










}