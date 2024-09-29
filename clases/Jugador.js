export default class Jugador extends Phaser.Physics.Arcade.Sprite {

    
    constructor(escena, x, y, sprite, indice) {
        super(escena, x, y, sprite); 
        escena.add.existing(this);
        escena.physics.world.enable(this);
        escena.cameras.main.startFollow(this);
        this.sprite = sprite 
        this.indice = indice

        this.init();
        this.crearHitboxes(escena)
        this.cargarListener();
        this.cargarAnimaciones();   
    }

    init(){
        this.setScale(1.32)
        this.setOffset(100,200)
        this.setDepth(0)
        this.body.setSize(this.width - 170, 40, 0, 0);


        this.enemigoGolpeador = '';

        this.fuerzaDePatada =15;
        this.fuerzaDePinia = 12;

        this.vidas = 100;  

        this.scene.barrasVida.nombreJugador.anims.pause(this.scene.barrasVida.nombreJugador.anims.anims.entries.nombresPeleadores.frames[this.indice]);


        this.banderaGameOver = true

        this.banderaDestruirObjeto = true // para que no dañe reiteradas veces en 1 solo golpe

        this.escala = 0.5

        this.velocidad = 450 * this.escala;

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
            this.state = 'nada';
        });



    }

    cargarAnimaciones() {

        this.anims.create({
            key: "caminar", //asigno un nombre a la animacion
            frames: this.anims.generateFrameNumbers(this.sprite,{start:1,end:28}), //indico que frames del spritesheet 
            //conforman la animacion
            frameRate:40, //velocidad de la animacion
            repeat:0 //cantidad de veces que se repetirá la animacion. '-1' significa que se repite infinitamente.
        });

        this.anims.create({
            key: "parado", 
            frames: this.anims.generateFrameNumbers(this.sprite,{frames:[0]}), 
            frameRate:15, 
            repeat:0 
        });

        this.anims.create({
            key: "pinia",
            frames: this.anims.generateFrameNumbers(this.sprite,{start:44,end:52}), 
            frameRate:40, 
            repeat:0 
        });

        this.anims.create({
            key: "patada",
            frames: this.anims.generateFrameNumbers(this.sprite,{start:29,end:43}), 
            frameRate:15, 
            repeat:0 
        });

        this.anims.create({
            key: "heridoBajo",
            frames: this.anims.generateFrameNumbers(this.sprite,{start:53,end:67}), 
            frameRate:15, 
            repeat:0 
        });

        this.anims.create({
            key: "heridoAlto",
            frames: this.anims.generateFrameNumbers(this.sprite,{start:68,end:81}), 
            frameRate:40, 
            repeat:0 
        });

        this.anims.create({
            key: "muerto",
            frames: this.anims.generateFrameNumbers(this.sprite,{start:82,end:97}), 
            frameRate:15, 
            repeat:0 
        });

        this.anims.currentAnim = 'parado'

    }
 

    actualizar(controlJoystick, controlTeclado, enemigos){

    if (this.state != 'muerto') { // si el jugador no esta muerto..

        

       ////////// Movimientos del jugador en funcion de los eventos del joystick virtual.

        let anguloPalanca = this.scene.joyStick.angle


        if (this.scene.joyStick.force > 0 ){  // si se esta corriendo la palanca de su centro (osea, si se está usando el joystick)

            if (anguloPalanca > -20 && anguloPalanca < 20)   { //derecha
                this.setVelocityX(this.velocidad); //muevo al jugador con una velocidad determinada en el eje X .
                this.setVelocityY(0 ); 
                this.flipX= false;
            }
            else if (anguloPalanca > 20 && anguloPalanca < 70) {
                this.setVelocityX(this.velocidad ); 
                this.setVelocityY(this.velocidad ); 
                this.flipX= false;
            }
            else if (anguloPalanca > 70 && anguloPalanca < 110) {  //abajo
                this.setVelocityY(this.velocidad);
            }
            else if (anguloPalanca > 70 && anguloPalanca < 160) {
    
                this.setVelocityX(-this.velocidad ); 
                this.setVelocityY(this.velocidad ); 
                this.flipX= true;
    
            }
            else if (anguloPalanca > 160 || anguloPalanca < -160) {  //izquierda
    
                this.setVelocityX(-this.velocidad);
                this.setVelocityY(0 ); 
                this.flipX= true; //voltear horizontalmente el sprite 
            }
    
            else if (anguloPalanca > -160 && anguloPalanca < -110) {
    
                this.setVelocityX(-this.velocidad ); 
                this.setVelocityY(-this.velocidad ); 
                this.flipX= true;
            }

            else if (anguloPalanca > -110 && anguloPalanca < -70) {   //arriba
    
                this.setVelocityY(-this.velocidad); 
            }
    
            else if (anguloPalanca > -70 && anguloPalanca < -20) {
    
                this.setVelocityX(this.velocidad ); 
                this.setVelocityY(-this.velocidad ); 
                this.flipX= false;
            } 
        }
        ////////// Movimientos del jugador con los eventos del teclado.

        // si no se esta accionando la palanca del joystick virtual, verifico las siguientes condiciones..

        else if (controlTeclado.right.isDown) { //si el el teclado esta generando un evento hacia la derecha...
            this.setVelocityX(this.velocidad); //muevo al jugador en el eje X .
            this.flipX= false;
            
        }  
        else if (controlTeclado.down.isDown) {
            this.setVelocityY(this.velocidad);


        } else if (controlTeclado.left.isDown) {
            this.setVelocityX(-this.velocidad);
            this.flipX = true; //voltear horizontalmente el sprite 

        } else if (controlTeclado.up.isDown) {
            this.setVelocityY(-this.velocidad); 
        
        }else{

            this.setVelocity(0);
        }







        ////////// Animacion del jugador en funcion de los estados activados por los botones o por los golpes recibidos

                //con la siguiente logica de condiciones, estoy dando prioridad al estado 'heridoBajo' y 'heridoAlto',
                //ya que toda animacion se verá interrumpida si recibo un golpe de mi enemigo

        if (this.state == 'heridoBajo') { this.anims.play('heridoBajo',true); }
    
        

        else if  (this.state == 'heridoAlto') { this.anims.play('heridoAlto',true); }


        if ( (this.anims.currentAnim.key == 'heridoBajo' || this.anims.currentAnim.key == 'heridoAlto')  && 
            this.anims.isPlaying == true ){

                // si la animacion actual es la de 'herido' y ademas se esta reproduciendo.. no se ejecuta otra animacion.
                //Esto lo hago para darle prioridad a la animacion de 'herido'.
            
        }else{


            if (this.state == 'pinia') {this.anims.play('pinia',true); }

            else if (this.state == 'patada') { this.anims.play('patada',true);}
    
            else if (this.state == 'nada' && this.body.speed != 0) { 
        
                this.anims.play("caminar", true); 
        
            }
        
            else{
        
                this.anims.play("parado", true);
        
        
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

            this.hitboxCuerpo.setPosition(this.x - 35 * this.escala , this.y)


        }

        //// GOLPE DEL JUGADOR (impacto del golpe en el enemigo)

        if (this.state == 'patada' || this.state == 'pinia' ){

            if (this.banderaDestruirObjeto == true) {this.destruirObjeto()}  
            //compruebo si existe un objeto destruible, y lo daño o destruyo


        if (enemigos != null ){


            enemigos.children.iterate(function (child){


                if (child.anims.currentAnim.key != 'rezaHernan') {
                // si el enemigo que recibe el golpe no es hernan rezando (porque cuando reza no le hace daño los golpes)

                    if (this.scene.physics.overlap(this.hitboxPatada, child.hitboxCuerpo) == true &&
                    this.state == 'patada' && (this.anims.getFrameName() == 31 || this.anims.getFrameName() == 32)) {

                    //si el enemigo esta realizando una patada , y ademas, nos encontramos en el frame de la animacion correspondiente
                    // al impacto de la patada.

                        this.quitarVidas(child, this.fuerzaDePatada); 

  


                    } else if (this.scene.physics.overlap(this.hitboxPinia, child.hitboxCuerpo) == true &&
                        this.state == 'pinia' && (this.anims.getFrameName() == 45 || this.anims.getFrameName() == 46)) {
                            
                            
                        this.quitarVidas(child, this.fuerzaDePinia);          



                    }
                }

            }, this)



            ///// desplazamiento por el golpe del enemigo 


            if  (this.state == 'heridoAlto' || this.state == 'heridoBajo' ) {

                //busco en el array de enemigos (enemigos.children.entries[]) , al objeto enemigo que golpeó al jugador, y lo
                // guardo en la variable 'enemigo'. 
                let enemigo = enemigos.children.entries.find(obj => {  
                    return obj.name === this.enemigoGolpeador
                  })
                  
                if (enemigo) {

                    let posicion = this.x - enemigo.x
            
                    if (posicion > 0){ this.setVelocityX(400 * this.escala)} else {this.setVelocityX(-400 * this.escala)}

                }


            }





        }

                    
        }


        //actualizo el ancho de la barra de energia del jugador, en funcion de sus vidas
        this.scene.barrasVida.barraJugador.displayWidth = this.vidas;
        
        if (this.vidas > 350) {this.vidas = 350} //no permito que el jugador acumule mas de 350 vidas



    }else {  // si el jugador esta muerto (osea this.state == 'muerto')
        
         


        if (this.anims.currentFrame.textureFrame < 97) {  // si el frame de la animacion es menor a 97 (la animacion aún no terminó)
            this.anims.play("muerto", true); // reproducir la animacion de 'muerto'

            //elimino los listeners (en este caso los oyentes del evento 'pointerdown') de los botones A y B, para que el jugador
            // quede realmente inmovil
            this.scene.botones.botonA.removeAllListeners('pointerdown');
            this.scene.botones.botonB.removeAllListeners('pointerdown');
         

        }else {   // si la animacion de 'muerto' llegó al frame 97, que es el ultimo frame de la animacion, osea la animacion terminó.
            this.anims.stop();   //detengo la animacion
            this.setImmovable(true);  //el sprite del jugador se vuelve inmovil, no puede empujarse
            this.setVelocityX(0); // detengo el movimiento 

            if (this.banderaGameOver == true) {  // bandera para ingresar solo una vez al bloque

                this.banderaGameOver = false

                //Si muere el jugador, se muestra la pantalla de Game Over
                this.scene.time.delayedCall(2000, this.pantallaGameOver, [this.scene]);


            }

        }
    
    }

    }



    pantallaGameOver (escena){  //muestro pantalla de Game Over


            this.centrarX = escena.cameras.main.worldView.x + escena.cameras.main.width / 2;
            this.centrarY = escena.cameras.main.worldView.y + escena.cameras.main.height / 2;

            this.gameOver = escena.add.image(this.centrarX, this.centrarY, 'gameOverPerdiste').setScale(1).setDepth(4)

            escena.time.delayedCall(4000, reiniciaJuego, [escena]);

            function reiniciaJuego (escena){ //reinicio el juego desde la intro
        
                escena.scene.start('intro' ,  { gameOver: 'true'})

            }


        


    }










    quitarVidas(enemigo, n){  //reduzco las vidas del enemigo

        enemigo.vidas = enemigo.vidas - n ;

        if (enemigo.vidas <= 0) {  //si las vidas llegaron a cero
            enemigo.vidas = 0  // para que 'enemigo.vidas' no sea un valor negativo
            enemigo.state = 'muerto'
          

        }else if (n == this.fuerzaDePinia ) {  // segun el valor de 'n' , deduzco el tipo de golpe al enemigo

                enemigo.state = 'heridoAlto'} 
            else { 
                enemigo.state = 'heridoBajo'}

        // actualizo el ancho de la barra de energia del enemigo, en funcion de las vidas del enemigo
        this.scene.barrasVida.barraEnemigos.displayWidth = enemigo.vidas;


        //efecto de movimiento de camara al realizar un golpe
        if (enemigo.state != 'muerto') {moverCamara(this.scene )}


        
        function moverCamara(escena){


            escena.cameras.main.setPosition(escena.cameras.main.x - 8 * escena.jugador.escala, escena.cameras.main.y - 8 * escena.jugador.escala)
            //mueve la posicion de la camara, pero no afecta a la posicion 'real' de la camara, es como un 'offset' de la camara

            escena.time.delayedCall(100, volverPosicionOriginal, [escena]); //timer que llamará a la funcion en 100 milisegundos

        }

        function volverPosicionOriginal(escena){

            escena.cameras.main.setPosition(escena.cameras.main.x +8 * escena.jugador.escala, escena.cameras.main.y +8 * escena.jugador.escala)

        }


    }

    destruirObjeto(){

        

        let objetoADestruir

        if ((this.scene.physics.overlap(this.hitboxPatada, this.scene.itemsRompibles, (a,b) => {objetoADestruir = b}) == true &&
        this.state == 'patada' && (this.anims.getFrameName() == 31 || this.anims.getFrameName() == 32)) ||
            // si hay superposicion entre el hitbox de la patada, y el cuerpo de alguno de los objetos rompibles, almaceno ese objeto
            // que se encuentra superpuesto en 'objetoADestruir'. Y si ademas, el jugador se encuentra en estado 'patada' y en los
            // frames de la animacion de patada 31 o 32 (impacto de la patada)  ó ....
        (this.scene.physics.overlap(this.hitboxPinia, this.scene.itemsRompibles, (a,b) => {objetoADestruir = b}) == true &&
        this.state == 'pinia' && (this.anims.getFrameName() == 45 || this.anims.getFrameName() == 46))) {
            // repito el condicional anterior pero con el hitbox , la animacion y el estado de la pinia...

            //console.dir(objetoADestruir)

            if (objetoADestruir.visible == true){

                this.banderaDestruirObjeto = false

                objetoADestruir.state = objetoADestruir.state - 0.5 //reduzco la integridad del objeto

                if (objetoADestruir.state <= 0){  //si el objeto quedo destruido  


                    // muestro la animacion de explosion . Lo hago de esta manera porque sino la animacion se ve pequenia :(  
                    this.explosion = this.scene.add.sprite(objetoADestruir.x + objetoADestruir.displayWidth/2 ,objetoADestruir.y + objetoADestruir.displayHeight/2 , 'explosion2').setScale(1.5 * this.escala);
                    this.explosion.anims.play("explosion2");


                    objetoADestruir.setVisible(false) //desaparece el objeto destruido
                    objetoADestruir.body.setEnable(false) // para no seguir colisionando con el objeto destruido

                    this.banderaDestruirObjeto = true

                    if (objetoADestruir.name == 'tienePollo' && (this.scene.escenaAnterior == "escena1" || (this.scene.escenaAnterior == "escena3" && this.scene.llaveNegocio == true)) ) { 
                        //si destruí el tacho que tiene pollo, y ademas vengo del escenario 1, ó del escenario 3 y con la llave...

                        // muestro el pollo  
                        this.scene.pollo = this.scene.add.sprite(4850 * this.escala,950 * this.escala , 'pollo').setScale(0.4 * this.escala);
                        this.scene.pollo.anims.play("pollo");
                        this.scene.sombra = this.scene.physics.add.sprite(4850 * this.escala,1050 * this.escala, 'sombra').setScale(1.7 * this.escala).setOffset(0,20);
                        this.scene.sombra.anims.play("sombra");
                        
                    }
                    if (objetoADestruir.name == 'haceDanio' ){ //si destruyo el matafuego


                        this.vidas =  this.vidas - 100 ;

                        if (this.vidas <= 0) {  //si las vidas llegaron a cero
                            this.vidas = 0  // para que 'this.vidas' no sea un valor negativo
                            this.state = 'muerto'
                        }else{
                            this.anims.play('heridoBajo',true); 
                            //ejecuto directamente la animacion, en vez de cambiar el estado del jugador, porque cuando cambiaba el estado me daba error :P
                        }
                
                        this.scene.barrasVida.barraJugador.displayWidth = this.vidas;
                          
                


                    }

                }else{

                    //efecto de movimiento que genero en el objeto golpeado
                    objetoADestruir.setPosition(objetoADestruir.x - 8 * this.escala, objetoADestruir.y - 8 * this.escala)

                    this.scene.time.delayedCall(50, volverPosicionOriginal, [this]); 


                }
            }

        }
        function volverPosicionOriginal(that){

            objetoADestruir.setPosition(objetoADestruir.x +8 * that.escala, objetoADestruir.y +8 * that.escala)

            that.banderaDestruirObjeto = true


        }

    
    }


    
        



}

