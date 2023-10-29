

class escena1 extends Phaser.Scene { //defino una clase escena1, que hereda sus propiedades y metodos de
    // la clase Phaser.Scene (estoy definiendo un escenario del juego)
    // el nombre de esta clase debe coincidir con el nombre del archivo .js que la contiene.

    constructor(){ //metodo constructor de la clase (se invoca al instanciar un objeto de esta clase)
        super("nivel1") ; //invoco al constructor de la clase padre, y le ingreso como parametro el
        //nombre de la escena 'nivel1'
    }



   


// las funciones preload, create y update , son funciones de la clase Scene (Phaser.Scene)
preload ()  //funcion que carga los recursos en memoria (se ejecuta una sola vez)
{
    this.load.image('fondo', 'multimedia/imagenes/fondo.png');  //cargo una imagen, y la asocio a la etiqueta 'fondo'
    //'this' hace referencia a la escena (objeto Scene)

    this.load.image('botonFullScreen', 'multimedia/imagenes/fullscreen.png');

    //cargo la hoja de sprites del jugador
    this.load.spritesheet('jugador', 'multimedia/animaciones/juan/Sin título-1.png', { frameWidth: 150, frameHeight: 245 });


    //cargo el plugin del joystick.
    //el primer parametro es un id que ya viene asignado,y el segundo es la ruta (url)donde se halla el plugin.
    this.load.plugin('rexvirtualjoystickplugin', './rexvirtualjoystickplugin.js', true);


}

create () //funcion que crea y agrega los recursos en la escena (se ejecuta una sola vez)
{


    escala = 2.2; //escalar las imagenes, sprites y hitbox del juego

    //FONDO
    fondo = this.add.image(0, 0, 'fondo').setOrigin(0, 0); //agrega una imagen a la escena
    
    // 'this.add.image(0, 0, 'fondo') ' devuelve una imagen que estará ubicada en la coordenada 0,0 .
    //  Peeero en Phaser 3, las coordenadas 0,0 corresponde al centro de la imagen .
    // Con el metodo 'setOrigin()' puedo cambiar esto, y hacer que la coordenada 0,0 sea la esquina 
    //superior izquierda. 
    fondo.setScale(escala); //escalo la imagen segun lo almacenado en 'escala'
    

    //PAREDES (areas invisibles de colision)
    paredes = this.physics.add.staticGroup(); //creo un grupo de elementos estaticos que tendran fisica.
    //Tendran fisica , asi pueden colisionar con el jugador.
    let pared1 = paredes.create(0, 0); //creo un gameobject, que pertenecerá al grupo de elementos estaticos
    //almacenado en 'paredes', y lo guerdo en 'pared1' para su posterior manipulacion.
    //Lo creo en las mismas coordenadas del fondo, para que coincidan las paredes (areas de colision) con
    //la textura (dibujo) del fondo.
    let pared2 = paredes.create(0, 0);  //creo otro gameobject en el mismo grupo almacenado en 'paredes'
   
    pared1.body.setSize(2370 * escala, 275 * escala, 0, 0); //defino el tamaño del body del gameobject,
    //de esta manera estoy definiendo el tamaño del area de colision del gameobject


    //JUGADOR
    //creo el jugador, y le doy propiedades fisicas (physics), para poder aplicarle fuerza y moverlo.
    // Guardo el sprite en la variable global 'jugador', para poder utilizarlo en otros niveles, y ademas,
    // para poder acceder a sus propiedades en todo momento.
    jugador=this.physics.add.sprite(500,500,"jugador");
    jugador.setScale(escala * 0.6)
  
    // para que la camara siga al jugador
    this.cameras.main.startFollow(jugador); 


    //ANIMACIONES

    this.anims.create({
        key: "caminar", //asigno un nombre a la animacion
        frames: this.anims.generateFrameNumbers("jugador",{start:0,end:12}), //indico que frames del spritesheet 
        //conforman la animacion
        frameRate:15, //velocidad de la animacion
        repeat:-1 //cantidad de veces que se repetirá la animacion. '-1' significa que se repite infinitamente.
    });

    this.anims.create({
        key: "parado", 
        frames: this.anims.generateFrameNumbers("jugador",{frames:[13]}), 
        frameRate:15, 
        repeat:-1 
    });


    //CONTROLES DE ENTRADA
    // creo el joystick virtual (tactil) y defino sus propiedades
    this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
        x: 250,
        y: 650,
        radius: 100,
        base: this.add.circle(0, 0, 200, 0x888888),
        thumb: this.add.circle(0, 0, 100, 0xcccccc),
     });
    
    controlJoystick = this.joyStick.createCursorKeys(); //convierto mi joystick virtual en un control 
    //que genera eventos, que posteriormente podré asociar a los movimientos de mi jugador


    controlTeclado = this.input.keyboard.createCursorKeys(); //tambien convierto mi teclado en un control 
    //que genera eventos.






    //BOTON FULLSCREEN

    let botonFull=this.add.image(1400,100,"botonFullScreen");// agregamos la imagen del boton

           botonFull.setInteractive().on("pointerdown",function() {
         //'setInteractive()' vuelve clickeable (interactiva) a la imagen del boton.
         //'on()' define que funcion se ejecutará al interactuar con el boton .
         // "pointerdown" indica el evento que se espera para ejecutar la funcion.
            if(this.scene.scale.isFullscreen==false) {
                this.scene.scale.startFullscreen(); //pasar a pantalla completa
            }
            else {
                this.scene.scale.stopFullscreen(); //salir de pantalla completa
                console.log(this.scene.scale.isFullscreen)
            }
            
           })



}

update () //funcion que actualiza el estado del juego (se ejecuta 60 veces por segundo)
{

    this.physics.add.collider(jugador, paredes);
    //defino los movimientos del jugador en funcion del joystick

    if (controlJoystick.right.isDown || controlTeclado.right.isDown) { //si el joystick virtual o el teclado,
        // estan generando un evento hacia la derecha...
        jugador.setVelocityX(200); //muevo al jugador con una velocidad de 200 en el eje X .
        jugador.anims.play("caminar", true); //ejecutar la animacion 'caminar' del gameobject 'jugador'
        //'true' indica que la animacion no vuelva a comenzar si ya se está reproduciendo.
        jugador.flipX= false;
    }
    else if (controlJoystick.left.isDown || controlTeclado.left.isDown) {
        jugador.setVelocityX(-200);
        jugador.anims.play("caminar", true);
        jugador.flipX= true; //voltear horizontalmente el sprite 
    }
    else if (controlJoystick.up.isDown || controlTeclado.up.isDown ) { 
        jugador.setVelocityY(-200); 
        jugador.anims.play("caminar", true);
    
    }
    else if (controlJoystick.down.isDown || controlTeclado.down.isDown) {
        jugador.setVelocityY(200);
        jugador.anims.play("caminar", true);
    }
    
    else {
        jugador.setVelocity(0);
        jugador.anims.play("parado", true);
    }

    if(juego.input.activePointer.isDown){
    console.log(this.input.mousePointer.worldX);
    console.log(this.input.mousePointer.worldY);
    }
}


}