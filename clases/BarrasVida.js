export default class BarrasVida extends Phaser.GameObjects.Group {
    constructor(escena) {
        super(escena);

        //creo dos sprites vacios (sin texturas), donce iran los nombres de los peleadores (sobre la barra de energia)
                
        this.nombreJugador = this.create(50, 50)
            .setOrigin(0, 0)
            .setScale(2)
            .setDepth(3)
            .setScrollFactor(0) 

        this.nombreEnemigos = this.create(1450, 50)
            .setOrigin(0, 0)
            .setScale(2)
            .setDepth(3)
            .setScrollFactor(0) 

        this.barraJugador = this.create(50, 120, 'barra')
            .setOrigin(0, 0)
            .setScale(1,2)
            .setDepth(3)
            .setScrollFactor(0) 
        
        this.barraEnemigos = this.create(1450, 120, 'barra')
            .setOrigin(0, 0)
            .setScale(1,2)
            .setDepth(3)
            .setScrollFactor(0) 
        this.barraEnemigos.displayWidth = 0  //inicializo en cero, ya que al inicio, no hay ningun enemigo presente
        
        //los nombres mostrados en pantalla , se obtendran de los frames de una animacion
        this.cargarAnimaciones(); 



    }

    cargarAnimaciones(){

        //creo la animacion con los nombres de los peleadores

        this.nombreJugador.anims.create({
            key: "nombresPeleadores",
            frames: this.nombreJugador.anims.generateFrameNumbers('nombresPeleadores', { start: 0, end: 3 }),
            frameRate: 15,
            repeat: 0
        });

        this.nombreEnemigos.anims.create({
            key: "nombresPeleadores",
            frames: this.nombreEnemigos.anims.generateFrameNumbers('nombresPeleadores', { start: 0, end: 3 }),
            frameRate: 15,
            repeat: 0
        });

        //cargo la animacion en el elemento vacio
        this.nombreJugador.anims.currentAnim = 'nombresPeleadores' 

        this.nombreEnemigos.anims.currentAnim = 'nombresPeleadores' 

        //inicializo la animacion pausandola en el frame '0' (que es un frame vacio)

        this.nombreJugador.anims.pause(this.nombreJugador.anims.anims.entries.nombresPeleadores.frames[0]);
        this.nombreEnemigos.anims.pause(this.nombreEnemigos.anims.anims.entries.nombresPeleadores.frames[0]);

    }
}