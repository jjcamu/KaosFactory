//variables globales a utilizar en todos los niveles:

var jugador; //acá guardare el sprite de mi jugador

var fondo, paredes, costadoPorton , bolsaBasura, porton 

var botonA, botonB, botonFull

var escala; //para escalar las imagenes, sprites y hitbox del juego

var velocidad; // velocidad del jugador

var controlJoystick; //acá el control del joystick

var controlTeclado;

export default class escena1 extends Phaser.Scene { //defino una clase exportable llamada escena1, que hereda sus propiedades y metodos 
    //de la clase Phaser.Scene (estoy definiendo un escenario del juego)
    // el nombre de esta clase debe coincidir con el nombre del archivo .js que la contiene.


  

    constructor(){ //metodo constructor de la clase (se invoca al instanciar un objeto de esta clase)
        super("nivel1") ; //invoco al constructor de la clase padre, y le ingreso como parametro el
        //nombre de la escena 'nivel1'
    }



    


// las funciones preload, create y update , son funciones de la clase Scene (Phaser.Scene)
preload ()  //funcion que carga los recursos en memoria (se ejecuta una sola vez)
{
    this.load.image('fondo', 'multimedia/imagenes/nivel1/fondo.png');  //cargo una imagen, y la asocio a la etiqueta 'fondo'
    //'this' hace referencia a la escena (objeto Scene)

    this.load.image('botonFullScreen', 'multimedia/imagenes/nivel1/fullscreen.png');
    this.load.image('bolsaBasura', 'multimedia/imagenes/nivel1/fabrica1_bolsabasura.png');
    this.load.image('costadoPorton', 'multimedia/imagenes/nivel1/fabrica1_costadoporton.png');
    this.load.image('heladera', 'multimedia/imagenes/nivel1/fabrica1_heladera.png');
    this.load.image('puertaNegocio', 'multimedia/imagenes/nivel1/fabrica1_puertanegocio.png');
    this.load.image('porton', 'multimedia/imagenes/nivel1/fabrica1_porton.png');

    this.load.spritesheet('botonA', 'multimedia/imagenes/botonA-Sheet100x100.png', { frameWidth: 100, frameHeight: 100 });
    this.load.spritesheet('botonB', 'multimedia/imagenes/botonB-Sheet100x100.png', { frameWidth: 100, frameHeight: 100 });

    this.load.image('base', 'multimedia/imagenes/palanca-base.png')
    this.load.image('bolita', 'multimedia/imagenes/palanca-bolita.png')

    this.load.spritesheet('explosion', 'multimedia/animaciones/nivel1/explosion_012-3-Sheet70x70.png', { frameWidth: 70, frameHeight: 70 });
    this.load.spritesheet('portonRoto', 'multimedia/animaciones/nivel1/porton_roto0001-Sheet400x300.png', { frameWidth: 400, frameHeight: 300 });

    //cargo la hoja de sprites del jugador
    this.load.spritesheet('jugador', 'multimedia/animaciones/juan/juan293x272.png', { frameWidth: 293, frameHeight: 272 });



    //cargo el plugin del joystick.
    //el primer parametro es un id que ya viene asignado,y el segundo es la ruta (url)donde se halla el plugin.
    this.load.plugin('rexvirtualjoystickplugin', './rexvirtualjoystickplugin.js', true);


}

create () //funcion que crea y agrega los recursos en la escena (se ejecuta una sola vez)
{


    escala = 2.2; //escalar las imagenes, sprites y hitbox del juego

    //velocidad = 400 // velocidad para las pruebas en el celu
    velocidad = 800 // velocidad para las pruebas en la compu



    //FONDO --------------------------------------------------------------------------------------------------------
    fondo = this.add.image(0, 0, 'fondo').setOrigin(0, 0); //agrega una imagen a la escena
    
    // 'this.add.image(0, 0, 'fondo') ' devuelve una imagen que estará ubicada en la coordenada 0,0 .
    //  Peeero en Phaser 3, las coordenadas 0,0 corresponde al centro de la imagen .
    // Con el metodo 'setOrigin()' puedo cambiar esto, y hacer que la coordenada 0,0 sea la esquina 
    //superior izquierda. 
    fondo.setScale(escala); //escalo la imagen segun lo almacenado en 'escala'
    fondo.depth = -2; //(depth: profundidad en el eje z)(z-index) , por defecto, los gameobjects se crean en
    //el depth 0 .



    //PAREDES (areas invisibles de colision y objetos que conforman el escenario)-----------------------------------

    paredes = this.physics.add.staticGroup(); //creo un grupo de elementos estaticos que tendran fisica.
    //Tendran fisica , asi pueden colisionar con el jugador.


    let pared_arriba = paredes.create(0, 0); //creo un gameobject, que pertenecerá al grupo de elementos estaticos
    //almacenado en 'paredes', y lo guerdo en 'pared1' para su posterior manipulacion.
    //Lo creo en las mismas coordenadas del fondo, para que coincidan las paredes (areas de colision) con
    //la textura (dibujo) del fondo.
    pared_arriba.body.setSize(2370 * escala, 265 * escala, 0, 0); //defino el tamaño del body del gameobject,
    //de esta manera estoy definiendo el tamaño del area de colision del gameobject


    let pared_abajo = paredes.create(0, 946);  //creo otro gameobject en el mismo grupo almacenado en 'paredes'
    pared_abajo.body.setSize(2370 * escala, 10 * escala, 0, 0);

    let estante1 = paredes.create(1820,0);
    estante1.body.setSize(1580 , 635 , 0, 0);

    let estante2 = paredes.create(4330,0);
    estante2.body.setSize(787 , 635 , 0, 0);

    let heladera = paredes.create(3944, 418, 'heladera');
    heladera.setScale(escala); 
    heladera.body.setSize(heladera.width * escala , heladera.height * escala )
    heladera.setOffset(-70,-100)

    let puertaNegocio = paredes.create(3640, 370, 'puertaNegocio');
    puertaNegocio.setScale(escala); 
    puertaNegocio.body.setSize(puertaNegocio.width * escala , puertaNegocio.height * escala )
    puertaNegocio.setOffset(-70,-100)

    costadoPorton = paredes.create(1598, 100, 'costadoPorton').setOrigin(0, 0);
    costadoPorton.setScale(escala); 
    costadoPorton.body.setSize(costadoPorton.width * escala - 80, costadoPorton.height * escala -700 , 0 , 0)
    costadoPorton.setOffset(100,870)

    //Objetos con los que interactua el jugador --------------------------------------------------------------------

    bolsaBasura = this.physics.add.sprite(1340,510, 'bolsaBasura'); //creo un sprite con fisica (colisionable)
    bolsaBasura.setImmovable(true); //convierto este sprite en estatico, osea inamovible
    bolsaBasura.setScale(escala); 
    bolsaBasura.body.setSize(bolsaBasura.width  , bolsaBasura.height - 10 )

    porton = this.physics.add.sprite(1505, 498, 'porton');
    porton.setImmovable(true);
    porton.setScale(escala); 
    porton.body.setSize(porton.width - 50, porton.height   )
    porton.setOffset(50,-5) 
   
    //BOTONES 'A' Y 'B' --------------------------------------------------------------------------------------------

    //Boton A
    botonA=this.add.sprite(1500,750, 'botonA');
    botonA.setScale(escala * 1.3); 
    botonA.depth=1;

    //animaciones del boton (presionado y sin presionar)
    this.anims.create({ 
        key: "botonA-apretado", //asigno un nombre a la animacion
        frames: this.anims.generateFrameNumbers("botonA",{frames:[1]}) ,//indico que frames del spritesheet 
        //conforman la animacion
        repeat:-1 
    });
    this.anims.create({
        key: "botonA", //asigno un nombre a la animacion
        frames: this.anims.generateFrameNumbers("botonA",{frames:[0]}), //indico que frames del spritesheet 
        //conforman la animacion
        repeat:1 
    });



    //Boton B
    botonB=this.add.sprite(1700,550, 'botonB');
    botonB.setScale(escala * 1.3); 
    botonB.depth=1;

    //animaciones del boton (presionado y sin presionar)
    this.anims.create({
        key: "botonB-apretado", //asigno un nombre a la animacion
        frames: this.anims.generateFrameNumbers("botonB",{frames:[1]}) ,//indico que frames del spritesheet 
        //conforman la animacion
        repeat:-1 
    });
    this.anims.create({
        key: "botonB", //asigno un nombre a la animacion
        frames: this.anims.generateFrameNumbers("botonB",{frames:[0]}), //indico que frames del spritesheet 
        //conforman la animacion
        repeat:1 
    });

//-----------------------------------------------------------------------------------------------------------------
    // Interaccion con los botones, y gestor de estados del jugador ()
    //hago interactivo al botonA (se convierte en un oyente de eventos)
    botonA.setInteractive().on("pointerdown",function() {  //si presiono sobre el botonA...
         
        botonA.anims.play("botonA-apretado", true); //botonA sombreado
        jugador.state = 'pinia'  //cambia estado del jugador 

    })
    
    botonA.setInteractive().on("pointerup",function() {  //dejo de presionar el botonA
        
        botonA.anims.play("botonA", true); //botonA pierde el efecto sombreado y vuelve a la normalidad
    })  



    botonB.setInteractive().on("pointerdown",function() { 
        
        botonB.anims.play("botonB-apretado", true);
        jugador.state = 'patada'
    })

    botonB.setInteractive().on("pointerup",function() { 

        botonB.anims.play("botonB", true);
    })

  


    //JUGADOR -----------------------------------------------------------------------------------------------------
    //creo el jugador, y le doy propiedades fisicas (physics), para poder aplicarle fuerza y moverlo.
    // Guardo el sprite en la variable global 'jugador', para poder utilizarlo en otros niveles, y ademas,
    // para poder acceder a sus propiedades en todo momento.
    


    jugador=this.physics.add.sprite(400,500,"jugador");  //400, 500
    jugador.setScale(escala * 0.6)
    jugador.setOffset(100,200)
    jugador.body.setSize(jugador.width - 170, 40, 0, 0);


  
    // para que la camara siga al jugador
    this.cameras.main.startFollow(jugador); 

    jugador.on('animationcomplete', () => { //cuando el evento 'animationcomplete' ocurra, se ejecutará la siguiente
    // arrow function.. Osea, cuando se complete la animacion del jugador, este pasará al estado 'nada'
        jugador.state = 'nada';
    });



    //ANIMACIONES DEL JUGADOR -------------------------------------------------------------------------------------

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


    //CONTROLES DE ENTRADA ---------------------------------------------------------------------------------------
    // creo el joystick virtual (tactil) y defino sus propiedades
    this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
        x: 250, 
        y: 650,
        radius: 100,
        base: this.add.image(0,0, 'base'), //Imagenes que conforman la palanca del joystick
        thumb: this.add.image(0,0, 'bolita'),
     });
    
    controlJoystick = this.joyStick.createCursorKeys(); //convierto mi joystick virtual en un control 
    //que genera eventos, que posteriormente podré asociar a los movimientos de mi jugador


    controlTeclado = this.input.keyboard.createCursorKeys(); //tambien convierto mi teclado en un control 
    //que genera eventos.






    //BOTON FULLSCREEN--------------------------------------------------------------------------------------------

    botonFull=this.add.image(1806,100,"botonFullScreen");// agregamos la imagen del boton
    botonFull.depth = 1;//(depth: profundidad en el eje z)(z-index) ubico el boton en el nivel 1, osea por encima de
    //los demas gameobjects.
    botonFull.alpha = 0.5; // (transparencia) disminuyo su alfa a 0.5 (el rango debe ser entre 0 y 1)

           botonFull.setInteractive().on("pointerdown",function() {
         //'setInteractive()' vuelve clickeable (interactiva) a la imagen del boton.
         //'on()' define que funcion se ejecutará al interactuar con el boton .
         // "pointerdown" indica el evento que se espera para ejecutar la funcion.
            if(this.scene.scale.isFullscreen==false) {
                this.scene.scale.startFullscreen(); //pasar a pantalla completa
            }
            else {
                this.scene.scale.stopFullscreen(); //salir de pantalla completa

            }
            
           })

//COLISIONES ---------------------------------------------------------------------------------------------------------


    this.physics.add.collider(jugador, paredes); //indico que debe haber colision entre 'jugador', que es un
    //cuerpo con fisica, y 'paredes', que es un grupo de elementos estaticos (sin movimiento) con fisica.
    // Osea que estos dos gameobjects deben colisionar (chocar)


    this.physics.add.collider(jugador, bolsaBasura, function() {  //cuando el jugador choque con la bolsa de basura..
        bolsaBasura.state = 'chocado'; 
    });
    bolsaBasura.on('animationcomplete', () => {bolsaBasura.destroy();});

    this.physics.add.collider(jugador, porton, function() {  
        porton.state = 'chocado'; 
    });
    porton.on('animationcomplete', () => {porton.destroy();});

//Animaciones de los objetos del escenario---------------------------------------------------------------------------

this.anims.create({
    key: "explosion",  //nombre de la animacion
    frames: this.anims.generateFrameNumbers("explosion"), //nombre del spritesheet
    frameRate:15, 
    repeat:0 
});
this.anims.create({
    key: "portonRoto",  //nombre de la animacion
    frames: this.anims.generateFrameNumbers("portonRoto"), //nombre del spritesheet
    frameRate:10, 
    repeat:0 
});


}

update () //funcion que actualiza el estado del juego (se ejecuta 60 veces por segundo)
{


    botonFull.setScrollFactor(0) ; //fija en la pantalla el 'botonFull' (no se mueve cuando muevo mi jugador)
    botonA.setScrollFactor(0) ;
    botonB.setScrollFactor(0) ;



   


    //defino los movimientos del jugador en funcion de los eventos del teclado o del joystick virtual.
    if (controlJoystick.right.isDown || controlTeclado.right.isDown) { //si el joystick virtual o el teclado,
        // estan generando un evento hacia la derecha...
        jugador.setVelocityX(velocidad); //muevo al jugador con una velocidad de 200 en el eje X .
        jugador.flipX= false;
    }
    else if (controlJoystick.left.isDown || controlTeclado.left.isDown) {
        jugador.setVelocityX(-velocidad);
        jugador.flipX= true; //voltear horizontalmente el sprite 
    }
    else if (controlJoystick.up.isDown || controlTeclado.up.isDown ) { 
        jugador.setVelocityY(-velocidad); 
    
    }
    else if (controlJoystick.down.isDown || controlTeclado.down.isDown) {
        jugador.setVelocityY(velocidad);
  
    }
    
    else {

        jugador.setVelocity(0);

    }



    //animaciones del jugador, en funcion de los estados del jugador 
    //se ejecutaran una vez que haya finalizado la animacion anterior.

    if (jugador.state == 'pinia') {jugador.anims.play('pinia',true); }

    else if (jugador.state == 'patada') { jugador.anims.play('patada',true);
}
    else if (jugador.state == 'nada' && jugador.body.speed != 0) { 

        jugador.anims.play("caminar", true); //ejecutar la animacion 'caminar' del gameobject 'jugador'
        //'true' indica que la animacion no vuelva a comenzar si ya se está reproduciendo.

    }

    else{

        jugador.anims.play("parado", true);


    }

    
 


    



    if(this.game.input.activePointer.isDown){
    console.log(this.input.mousePointer.worldX);
    console.log(this.input.mousePointer.worldY);
    }

    //para dar efecto de profundidad, los objetos situados debajo del jugador, deben verse por encima de este...
    if (costadoPorton.body.y > jugador.body.y){ costadoPorton.depth = 1;} else { costadoPorton.depth = -1;}

    //interaccion con los objetos del escenario

    if ((jugador.state == 'pinia' || jugador.state == 'patada') && bolsaBasura.state == 'chocado' && bolsaBasura.active ){
        bolsaBasura.anims.play("explosion", true); 
    } 
    if ((jugador.state == 'pinia' || jugador.state == 'patada') && porton.state == 'chocado' && porton.active ){
        porton.anims.play("portonRoto", true);
    } 

    //console.log(bolsaBasura.active)

}


}


