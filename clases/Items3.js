import Jugador from "../clases/Jugador.js";
import Enemigo from "../clases/Enemigo.js";

export default class Items3 extends Phaser.Physics.Arcade.Group {
    constructor(fisicas, escena) {
        super(fisicas, escena);


        escena.carreta = escena.physics.add.sprite(2520, 850, 'carreta').setScale(2, 1.5).setSize(60,40)
        .setOffset(50,125).setFlipX(true)
        // la carreta es añadida directamente al escenario y no forma parte del grupo Items3, ya que no quiero que colisione
        // con mi jugador, pero si que lo atraviese (overlap)



        // pared frontal sala de envasado 

        this.paredA = this.create(2083, 198, 'paredA').setOrigin(0,0).setScale(1.3).setDepth(-2) 
        this.paredA.body.setImmovable(true).setEnable(false)
        this.paredB = this.create(2505, 383, 'paredB').setOrigin(0,0).setScale(1.3).setDepth(3) 
        this.paredB.body.setImmovable(true).setEnable(false)
        this.paredC = this.create(2655, 558, 'paredC').setOrigin(0,0).setScale(1.3).setDepth(2) 
        this.paredC.setSize(240,150).setOffset(50,290)
        this.paredC.body.setImmovable(true)
        

        this.paredEnvasado2 = this.create(2980, 730, 'paredEnvasado2').setOrigin(0,0).setScale(1.3).setDepth(2) 
        this.paredEnvasado2.setSize(this.paredEnvasado2.width ,30).setOffset(-100,330)
        this.paredEnvasado2.body.setImmovable(true)


        this.vidrio1 = this.create(3010, 770, 'vidrio1').setOrigin(0,0).setScale(1.3).setDepth(2) 
        this.vidrio1.alpha = 0.5
        this.vidrio1.setSize(20,20).setOffset(0,300)
        this.vidrio1.body.setImmovable(true)
        this.vidrio1.body.checkCollision.none = true  //'checkCollision' desactiva la colision con el body de los personajes, 
        //pero sin anular el body. En cambio body.setEnable(false) anula el body, y esto no permite a la funcion 'actualizarProfundidad' 
        //comparar la posicion de los bodys.

        this.vidrio1b = this.create(3540, 770, 'vidrio1').setOrigin(0,0).setScale(1.3).setDepth(2) 
        this.vidrio1b.alpha = 0.5
        this.vidrio1b.setSize(20,20).setOffset(0,300)
        this.vidrio1b.body.setImmovable(true)
        this.vidrio1b.body.checkCollision.none = true

        this.vidrio2 = this.create(2231, 430, 'vidrio2').setOrigin(0,0).setScale(1.3).setDepth(-2) 
        this.vidrio2.alpha = 0.5
        this.vidrio2.body.setImmovable(true).setEnable(false)    

        this.vidrio3 = this.create(2670, 580, 'vidrio3').setOrigin(0,0).setScale(1.3).setDepth(2) 
        this.vidrio3.alpha = 0.5
        this.vidrio3.setSize(20,20).setOffset(0,250)
        this.vidrio3.body.setImmovable(true)
        this.vidrio3.body.checkCollision.none = true



/*         this.mesa1 = this.create(2110, 470, 'mesa1').setOrigin(0,0).setScale(1.3)
        this.mesa1.body.setImmovable(true)

        this.mesa2 = this.create(2980, 730, 'mesa2').setOrigin(0,0).setScale(1.3)
        this.mesa2.body.setImmovable(true) */






        //// poligonos de colision de las paredes diagonales

        /// pared de atras de todo
        this.puntos1 = [ 0,0, 500,0, 1816,1204, 1289,1208 ]; // coordenadas de cada vertice del poligono ([x,y, x,y, ...])
        this.poligono1 = Phaser.Geom.Polygon.Translate(new Phaser.Geom.Polygon(this.puntos1), 3791, 565) //creo un poligono invisible
        //this.poligonoo = escena.add.polygon(2766, 1081, this.puntos1, 0x6666ff).setOrigin(0).setDepth(4); // para dibujar el poligono

        // pared de adelante 
        this.puntos2 = [ 0,0, 500,0, 1648,1210, 1129,1208 ]; 
        this.poligono2 = Phaser.Geom.Polygon.Translate(new Phaser.Geom.Polygon(this.puntos2), -515, 565) 



    }

    colisionParedDiagonal(personajes, poligono){ // compruebo si hay colision con el poligono que representa al area de colision 
        //de la pared diagonal (esto lo hago porque la fisica arcade de phaser, solo permite areas rectangulares sin angulo de rotacion)


        personajes.forEach((pesonaje) => {

            //verificar los vertices del body del personaje. si choca el vertice superior derecho, entonces setvelocity es -800
            // si choca el inferior izquierdo, es +800


            if  (Phaser.Geom.Polygon.Contains(poligono  ,pesonaje.body.x + pesonaje.body.width, pesonaje.body.y ))
            {
    
                
                pesonaje.setVelocityX(-800)
    
    
            } else if (Phaser.Geom.Polygon.Contains(poligono  ,pesonaje.body.x , pesonaje.body.y + pesonaje.body.height)) {
    
                
                pesonaje.setVelocityX(800)
            }

        })

    }


/// lanzamiento de la carreta ----------------------------------------------------------------------

lanzaCarreta(escena){


    escena.physics.moveToObject(escena.carreta, escena.jugador, 600);

    escena.banderaCarreta = false


}

choqueCarreta(hitBoxCuerpo, carreta){

    if (this.banderaChoque == true){

        this.banderaChoque = false

        this.jugador.vidas =  this.jugador.vidas - 100 ;
    
        if (this.jugador.vidas <= 0) {  //si las vidas llegaron a cero
            this.jugador.vidas = 0  // para que 'jugador.vidas' no sea un valor negativo
            this.jugador.state = 'muerto'
        }else{
            this.jugador.anims.play('heridoBajo',true); 
            //ejecuto directamente la animacion, en vez de cambiar el estado del jugador, porque cuando cambiaba el estado me daba error :P
        }
    
        this.barrasVida.barraJugador.displayWidth = this.jugador.vidas;


    }


}


mostrarLlave(escena){

    this.llave = escena.physics.add.sprite(escena.jugador.x - 200, escena.jugador.y - 50 , 'llave') . setScale(0.3).setDepth(3).setSize(50,50) 
    this.sombra = escena.physics.add.sprite(escena.jugador.x - 200, escena.jugador.y + 100, 'sombra') .setDepth(1)
    // la llave y la sombra son añadidas directamente al escenario y no forma parte del grupo Items3, ya que no quiero que colisione
    // con mi jugador, pero si que lo atraviese (overlap)

    this.llave.anims.create({
        key: "llave",  //nombre de la animacion
        frames: this.llave.anims.generateFrameNumbers("llave"), 
        frameRate:10, 
        repeat:-1 

    });

    this.sombra.anims.create({
        key: "sombra",  //nombre de la animacion
        frames: this.sombra.anims.generateFrameNumbers("sombra"), //nombre del spritesheet
        frameRate:10, 
        repeat:-1 
    });

    this.llave.anims.play('llave', true) // el game object 'llave' reproduce la animacion 'llave'
    this.sombra.anims.play('sombra', true)

    escena.banderaLlave = false

}









        

    

}