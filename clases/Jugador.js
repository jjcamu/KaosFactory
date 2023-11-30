export default class Jugador extends Phaser.Physics.Arcade.Sprite {
    constructor(escena, x, y, sprite) {
        super(escena, x, y, sprite); 
        escena.add.existing(this);
        escena.physics.world.enable(this);
        escena.cameras.main.startFollow(this); 

        this.init();
        this.crearHitboxes(escena)
        this.cargarListener();
        this.cargarAnimaciones();   
    }

    init(){
        this.setScale(1.32)
        this.setOffset(100,200)
        this.body.setSize(this.width - 170, 40, 0, 0);

        this.velocidad = 800;

    }

    crearHitboxes(escena){

        this.hitboxPinia = escena.physics.add.sprite()
        this.hitboxPinia.body.setSize(140,100).setOffset(50,-80)
        this.hitboxPinia.name = 'hitboxPinia'

        this.hitboxPatada = escena.physics.add.sprite()
        this.hitboxPatada.body.setSize(140,150).setOffset(50,10)
        this.hitboxPatada.name = 'hitboxPatada'



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
            frames: this.anims.generateFrameNumbers("jugador",{start:1,end:28}), //indico que frames del spritesheet 
            //conforman la animacion
            frameRate:40, //velocidad de la animacion
            repeat:0 //cantidad de veces que se repetirá la animacion. '-1' significa que se repite infinitamente.
        });

        this.anims.create({
            key: "parado", 
            frames: this.anims.generateFrameNumbers("jugador",{frames:[0]}), 
            frameRate:15, 
            repeat:0 
        });

        this.anims.create({
            key: "pinia",
            frames: this.anims.generateFrameNumbers("jugador",{start:44,end:52}), 
            frameRate:40, 
            repeat:0 
        });

        this.anims.create({
            key: "patada",
            frames: this.anims.generateFrameNumbers("jugador",{start:29,end:43}), 
            frameRate:15, 
            repeat:0 
        });

    }

    actualizar(controlJoystick, controlTeclado){

        //Movimientos del jugador en funcion de los eventos del teclado o del joystick virtual.


        if (controlJoystick.right.isDown || controlTeclado.right.isDown) { //si el joystick virtual o el teclado,
            // estan generando un evento hacia la derecha...
            this.setVelocityX(this.velocidad); //muevo al jugador con una velocidad de 200 en el eje X .
            this.flipX= false;
            
        }
        else if (controlJoystick.left.isDown || controlTeclado.left.isDown) {
            this.setVelocityX(-this.velocidad);
            this.flipX= true; //voltear horizontalmente el sprite 
         
        }
        else if (controlJoystick.up.isDown || controlTeclado.up.isDown ) { 
            this.setVelocityY(-this.velocidad); 
        
        }
        else if (controlJoystick.down.isDown || controlTeclado.down.isDown) {
            this.setVelocityY(this.velocidad);
    
        }
        
        else {

            this.setVelocity(0);

        }


        //Animacion del jugador en funcion de los estados activados por los botones

        if (this.state == 'pinia') {this.anims.play('pinia',true); }

        else if (this.state == 'patada') { this.anims.play('patada',true);}

        else if (this.state == 'nada' && this.body.speed != 0) { 
    
            this.anims.play("caminar", true); 
    
        }
    
        else{
    
            this.anims.play("parado", true);
    
    
        }

        if (this.flipX == false){

            this.hitboxPinia.setPosition(this.x, this.y)
            this.hitboxPatada.setPosition(this.x, this.y)
        }else{

            this.hitboxPinia.setPosition(this.x - 200, this.y)
            this.hitboxPatada.setPosition(this.x - 200, this.y)


        }
        

    }
}

