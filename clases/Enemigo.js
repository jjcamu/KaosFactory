export default class Enemigo extends Phaser.Physics.Arcade.Sprite {
    constructor(escena, x, y, spriteSheet, indice) {
        super(escena, x, y, spriteSheet); 
        escena.add.existing(this);
        escena.physics.world.enable(this);
        this.name = spriteSheet;  //el nombre del spriteSheet coincide con el nombre que le quiero dar a la instancia del Enemigo 
        this.indice = indice; // indice correspondiente al frame del spritesheet 'nombresBarra' de este enemigo

        this.init();
        this.crearHitboxes(escena)
        this.cargarListener();
        this.cargarAnimaciones(spriteSheet);   
    }

    init(){
        this.setScale(1.40)

        if (this.name == 'nico') {this.setScale(1.55, 1.42)}
        if (this.name == 'juan') {this.setScale(1.35, 1.34)}
        if (this.name == 'diego') {this.setScale(1.40, 1.38)}

        if (this.name == 'facu') {this.setScale(1.28, 1.35)}
        if (this.name == 'flor') {this.setScale(1.35, 1.30)}
        if (this.name == 'esteban') {this.setScale(1.32, 1.35)}

        this.setOffset(100,200)
        this.body.setSize(100, 40, 0, 0);
        //this.body.setSize(this.width - 170, 40, 0, 0);

        this.body.setBounce(1); //establezco un factor de rebote , esto lo hago para asegurarme que el cuerpo del enemigo 
        //no atraviese las paredes (las areas de colision)
        //Esto, y ademas estableciendo en el escenario un FPS de 120, ayuda a prevenir que el enemigo atraviese las paredes.

        this.state = 'nada'

        this.vidas = 250;

        this.fuerzaDePatada = 5;
        this.fuerzaDePinia = 3;

        this.escala = 0.5

        this.velocidad = 300 * this.escala;

        this.banderaSonido = true

    }

    crearHitboxes(escena){

        this.hitboxPinia = escena.physics.add.sprite()
        this.hitboxPinia.body.setSize(140,100).setOffset(50,-80)
        this.hitboxPinia.name = 'hitboxPinia'

        this.hitboxPatada = escena.physics.add.sprite()
        this.hitboxPatada.body.setSize(140,150).setOffset(50,10)
        this.hitboxPatada.name = 'hitboxPatada'

        this.hitboxCuerpo = escena.physics.add.sprite()  // hitbox correspondiente al area del jugador que puede recibir golpes
        this.hitboxCuerpo.body.setSize(100,300).setOffset(-15,-150)
        this.hitboxCuerpo.name = 'hitboxCuerpo'



    }


    cargarListener(){

        this.on('animationcomplete', () => { //cuando el evento 'animationcomplete' ocurra, se ejecutará la siguiente
        // arrow function.. Osea, cuando se complete la animacion del jugador, este pasará al estado 'nada'

            if (this.state != 'muerto') { this.state = 'nada'; }  
            
        });



    }

    cargarAnimaciones(spriteSheet) {

        this.anims.create({
            key: "caminarEnemigo", //asigno un nombre a la animacion
            frames: this.anims.generateFrameNumbers(spriteSheet,{start:1,end:28}), //indico que frames del spritesheet 
            //conforman la animacion
            frameRate:40, //velocidad de la animacion
            repeat:0 //cantidad de veces que se repetirá la animacion. '-1' significa que se repite infinitamente.
        });

        this.anims.create({
            key: "paradoEnemigo", 
            frames: this.anims.generateFrameNumbers(spriteSheet,{frames:[0]}), 
            frameRate:15, 
            repeat:0 
        });

        this.anims.create({
            key: "piniaEnemigo",
            frames: this.anims.generateFrameNumbers(spriteSheet,{start:44,end:52}), 
            frameRate:40, 
            repeat:0 
        });

        this.anims.create({
            key: "patadaEnemigo",
            frames: this.anims.generateFrameNumbers(spriteSheet,{start:29,end:43}), 
            frameRate:15, 
            repeat:0 
        });

        this.anims.create({
            key: "heridoBajo",
            frames: this.anims.generateFrameNumbers(spriteSheet,{start:53,end:67}), 
            frameRate:15, 
            repeat:0 
        });

        this.anims.create({
            key: "heridoAlto",
            frames: this.anims.generateFrameNumbers(spriteSheet,{start:68,end:81}), 
            frameRate:40, 
            repeat:0 
        });

        this.anims.create({
            key: "muerto",
            frames: this.anims.generateFrameNumbers(spriteSheet,{start:82,end:97}), 
            frameRate:15, 
            repeat:0 
        });

        this.anims.create({
            key: "diegoCelu", 
            frames: this.anims.generateFrameNumbers(spriteSheet,{frames:[98]}), 
            frameRate:15, 
            repeat:0 
        });



        this.anims.currentAnim = 'paradoEnemigo'

        

    }

    actualizar(jugador, comportamiento){

        

    if (this.state != 'muerto') { // si el enemigo no esta muerto..

        ////////// PERSECUCION

        let distancia = Phaser.Math.Distance.BetweenPoints(this, jugador)

        if (distancia <= 500 * this.escala) {  // mido la distancia entre el enemigo y el jugador

            if (this.state == 'heridoBajo' || this.state == 'heridoAlto'){

            ///// desplazamiento por el golpe recibido

            //si el enemigo esta siendo golpeado, no avanza hacia el jugador, ni se detiene tampoco, sino que se desplazará.

                let posicion = this.x - jugador.x
            
                if (posicion > 0){ this.setVelocityX(400 * this.escala)} else {this.setVelocityX(-400 * this.escala)}


            }else{  // si el enemigo no esta siendo golpeado..
                

                if (this.scene.physics.overlap(this.hitboxPinia, jugador.hitboxCuerpo) == false ) {  //si el enemigo aún no a alcanzado al jugador
                    // (osea, el hitbox de pinia del enemigo no se ha superpuesto con el hitbox del cuerpo del jugador) 
        
                        this.scene.physics.moveToObject(this, jugador, this.velocidad); // muevo al enemigo hacia la posicion del jugador
        
                        if (this.x > jugador.x) { this.flipX = true } else { this.flipX = false}  
                        // volteo horizontalmente el sprite segun la posicion del jugador
        
        
                } else  {  // si alcanzó al jugador . 

                    this.setVelocity(0);
                    let aleatorio = Phaser.Math.Between(0, 100)  //obtengo un numero entero aleatorio entre 0 y 100

                    /////  ESTADO DE GOLPE

                    if (aleatorio > comportamiento.pinia[0] && aleatorio < comportamiento.pinia[1]) {

                        this.state = 'pinia'

                    } else if (aleatorio > comportamiento.patada[0] && aleatorio < comportamiento.patada[1]) {

                        this.state = 'patada'

                    }


                    //// cambiar nombre y barra de vida del enemigo


                    this.cambiarBarraNombre(this.indice)

                }


            }





        }else{

            this.setVelocity(0);  //deja de moverse el enemigo
        }

    

        ////////// ANIMACION DEL ENEMIGO, en funcion de sus estados

        if (this.state == 'heridoBajo') { 

            this.anims.play('heridoBajo',true);
            if (this.banderaSonido== true) {this.scene.sound.play('golpeBajo' , { volume: 5 }); this.banderaSonido = false}

         }

        else if  (this.state == 'heridoAlto') { 
            
            this.anims.play('heridoAlto',true);
            if (this.banderaSonido== true) {this.scene.sound.play('golpeAlto' , { volume: 5 }); this.banderaSonido = false}

        
        }


        if ( (this.anims.currentAnim.key == 'heridoBajo' || this.anims.currentAnim.key == 'heridoAlto')  && 
            this.anims.isPlaying == true ){

                // si la animacion actual es la de 'herido' y ademas se esta reproduciendo.. no se ejecuta otra animacion.
                //Esto lo hago para darle prioridad a la animacion de 'herido'.
            
        }else{


            if (this.state == 'pinia') {
                
                this.anims.play('piniaEnemigo',true);
                if (this.banderaSonido== true) {this.scene.sound.play('golpePinia' , { volume: 5 }); this.banderaSonido = false}

            
            }

            else if (this.state == 'patada') { 
                
                this.anims.play('patadaEnemigo',true);
                if (this.banderaSonido== true) {this.scene.sound.play('golpePatada' , { volume: 5 }); this.banderaSonido = false}

            
            }
    
            else if (this.state == 'nada' && this.body.speed != 0) { 
        
                this.anims.play("caminarEnemigo", true); 
                this.banderaSonido = true

        
            }
        
            else{
        
                this.banderaSonido = true
                if (this.scene.animacionAparicionHernan == false) {
                    
                    this.anims.play("paradoEnemigo", true);
                    

                }

             
        
        
            }




        }
    

        ////////// posiciono los hitboxes , para que estos sigan al jugador

        // posiciono los hitboxes de la pinia y la patada, para que estos siempre queden al frente del sprite

        if (this.flipX == false){

            this.hitboxPinia.setPosition(this.x, this.y)
            this.hitboxPatada.setPosition(this.x, this.y)

            this.hitboxCuerpo.setPosition(this.x, this.y)
        }else{

            this.hitboxPinia.setPosition(this.x - 200 * this.escala , this.y)
            this.hitboxPatada.setPosition(this.x - 200 * this.escala, this.y)

            this.hitboxCuerpo.setPosition(this.x -35 * this.escala , this.y)



        }



        //// GOLPE DEL ENEMIGO (impacto del golpe en el jugador)
        

        if (this.scene.physics.overlap(this.hitboxPatada, jugador.hitboxCuerpo) == true &&
            this.state == 'patada' && (this.anims.getFrameName() == 31 || this.anims.getFrameName() == 32)) {
                
        //si el enemigo esta realizando una patada , y ademas, nos encontramos en el frame de la animacion correspondiente
        // al impacto de la patada.



            this.quitarVidas(jugador, this.fuerzaDePatada); 
            


        } else if (this.scene.physics.overlap(this.hitboxPinia, jugador.hitboxCuerpo) == true &&
            this.state == 'pinia' && (this.anims.getFrameName() == 45 || this.anims.getFrameName() == 46)) {



            this.quitarVidas(jugador, this.fuerzaDePinia); 

        }



    } else {  // si el enemigo esta muerto (osea this.state == 'muerto')
        
         


        if (this.anims.currentFrame.textureFrame < 97) {  // si el frame de la animacion es menor a 97 (la animacion aún no terminó)
            this.anims.play("muerto", true); // reproducir la animacion de 'muerto'
         

        }else {   // si la animacion de 'muerto' llegó al frame 97, que es el ultimo frame de la animacion, osea la animacion terminó.
            this.anims.stop();   //detengo la animacion
            this.body.setImmovable(true);  //el sprite del enemigo se vuelve inmovil, no puede empujarse
            this.body.setVelocityX(0); // detengo el movimiento 
            this.body.setEnable(false)
        }
    
    
    
    }

    }



    cambiarBarraNombre(indice){
         

        //llamo a la animacion cargada en el sprite 'nombreEnemigos', y pauso en un frame especifico. 
        // 'this.scene.barrasVida.nombreEnemigos.anims.anims.entries.nombresBarra.frames[indice]' hace referencia al frame especificado
        // por el parametro 'indice'.
        // De esta manera, segun el enemigo en cuestion, se mostrara su nombre sobre la barra de energia.

        this.scene.barrasVida.nombreEnemigos.anims.pause(this.scene.barrasVida.nombreEnemigos.anims.anims.entries.nombresPeleadores.frames[indice]);
        
        // defino el ancho de la barra de energia del enemigo, en funcion de las vidas del enemigo

        this.scene.barrasVida.barraEnemigos.displayWidth = this.vidas;

    }



    quitarVidas(jugador, n){  //reduzco las vidas del jugador

        jugador.vidas = jugador.vidas - n ;

        if (jugador.vidas <= 0) {  //si las vidas llegaron a cero
            jugador.vidas = 0  // para que 'jugador.vidas' no sea un valor negativo
            jugador.state = 'muerto'
          

        }else if (n == this.fuerzaDePinia ) {  // segun el valor de 'n' , deduzco el tipo de golpe al enemigo

                jugador.state = 'heridoAlto'} 
            else { 
                jugador.state = 'heridoBajo'}

        jugador.enemigoGolpeador = this.name ; //guardo el nombre del enemigo que golpeó al jugador en la variable 
        //'enemigoGolpeador' de la instancia 'jugador'. Esto lo hago para saber a que enemigo debo tomar como referencia para
        //desplazar al jugador golpeado.



        // actualizo el ancho de la barra de energia del jugador, en funcion de las vidas del jugador
        this.scene.barrasVida.barraJugador.displayWidth = jugador.vidas;


        //efecto de movimiento de camara al realizar un golpe
        if (jugador.state != 'muerto') {moverCamara(this.scene )}


        
        function moverCamara(escena){


            escena.cameras.main.setPosition(escena.cameras.main.x - 8 * escena.escala, escena.cameras.main.y - 8 * escena.escala)

            escena.time.delayedCall(100, volverPosicionOriginal, [escena]); //timer que llamará a la funcion en 100 milisegundos

        }

        function volverPosicionOriginal(escena){

            escena.cameras.main.setPosition(escena.cameras.main.x +8 * escena.escala , escena.cameras.main.y +8 * escena.escala)

        }





    }

/*     jugador.state = 'heridoBajo'
    jugador.enemigoGolpeador = this.name ; //guardo el nombre del enemigo que golpeó al jugador en la variable 
    //'enemigoGolpeador' de la instancia 'jugador' */



    


}

