import Jugador from "../clases/Jugador.js";
import Enemigo from "../clases/Enemigo.js";

export default class Items3 extends Phaser.Physics.Arcade.Group {
    constructor(fisicas, escena) {
        super(fisicas, escena);


        escena.carreta = escena.physics.add.sprite(2520, 850, 'carreta').setScale(2, 1.5).setSize(60,40)
        .setOffset(50,125).setFlipX(true)
        // la carreta es añadida directamente al escenario y no forma parte del grupo Items3, ya que no quiero que colisione
        // con mi jugador, pero si que lo atraviese (overlap)




        // sala de envasado
        this.maquina2 = this.create(3221, 340, 'maquina2').setOrigin(0,0).setScale(1.3)
        this.maquina2.setSize(this.maquina2.width -200,this.maquina2.height/3 -40 ).setOffset(150,this.maquina2.height-(this.maquina2.height/3 -20))
        this.maquina2.body.setImmovable(true) 

        this.maquina1 = this.create( 3082,  582, 'maquina1').setOrigin(0,0).setScale(1.3)
        this.maquina1.setSize((this.maquina1.width -100)/2,this.maquina1.height/2).setOffset(100,this.maquina1.height- this.maquina1.height/2)
        this.maquina1.body.setImmovable(true) 


        // pared frontal sala de envasado 

        this.paredA = this.create(2083, 198, 'paredA').setOrigin(0,0).setScale(1.3).setDepth(-2) 
        this.paredA.body.setImmovable(true).setEnable(false)
        this.paredB = this.create(2505, 383, 'paredB').setOrigin(0,0).setScale(1.3).setDepth(2)//3 
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

        this.mezcladora = this.create(560, 386, 'mezcladora').setOrigin(0,0).setScale(1.3).setDepth(-2) 
        this.mezcladora.body.setImmovable(true)  

        this.pailaCobre = this.create(946, 380, 'pailaCobre').setOrigin(0,0).setScale(1.3).setDepth(-2) 
        this.pailaCobre.body.setImmovable(true)  
        this.pailaCobre2 = this.create(1182, 380, 'pailaCobre').setOrigin(0,0).setScale(1.3).setDepth(-2) 
        this.pailaCobre2.body.setImmovable(true)  
        this.moledora = this.create(1628, 435, 'moledora').setOrigin(0,0).setScale(1.3).setDepth(-2)
        this.moledora.setSize(this.moledora.width -50,this.moledora.height - 30 )
        this.moledora.body.setImmovable(true)  

        this.mesa2 = this.create(1160, 570, 'mesa2').setOrigin(0,0).setScale(1.3).setDepth(-2)
        this.mesa2.setSize(this.mesa2.width -30, this.mesa2.height).setOffset(30,-20)
        this.mesa2.body.setImmovable(true)  


        this.mesa3 = this.create(2067, 918, 'mesa3').setOrigin(0,0).setScale(1.3)
        this.mesa3.setSize(this.mesa3.width -100,this.mesa3.height/3 ).setOffset(50,this.mesa3.height-(this.mesa3.height/3 + 30))
        this.mesa3.body.setImmovable(true)  

        this.mate = this.create(1262, 540, 'mate').setScale(0.3)
        this.mate.setSize(this.mate.width -50,this.mate.height- 50 )
        this.sombra1 = this.create(1262, 672, 'sombra').setScale(1.7)

        this.caramelos = this.create(2731, 512, 'caramelos').setScale(0.5)
        this.caramelos.setSize(this.caramelos.width -150,this.caramelos.height/3 )
        //this.sombra2 = this.create(4385, 400, 'sombra').setScale(1.7)


        this.amasadora = this.create(1470, 940, 'amasadora').setOrigin(0,0).setScale(1.3)
        this.amasadora.body.setImmovable(true)  
        this.amasadora.setSize(this.amasadora.width -60,this.amasadora.height/3 ).setOffset(30,this.amasadora.height-(this.amasadora.height/3 + 30))

        this.tarimaAzucar = this.create(1100, 1010, 'tarimaAzucar').setOrigin(0,0).setScale(1.3)
        this.tarimaAzucar.setSize(this.tarimaAzucar.width -50,this.tarimaAzucar.height/3 + 20).setOffset(20,this.tarimaAzucar.height-(this.tarimaAzucar.height/3 + 50))
        this.tarimaAzucar.body.setImmovable(true)  

        this.tachoBasura = this.create(950, 1160, 'tachoBasura').setOrigin(0,0).setScale(1.6)
        this.tachoBasura.setSize(this.tachoBasura.width ,this.tachoBasura.height/2 ).setOffset(0,this.tachoBasura.height-(this.tachoBasura.height/2))

        
        this.tarimaEsencias = this.create( 3002,  987, 'tarimaEsencias').setOrigin(0,0).setScale(1.3).setDepth(2) 
        this.tarimaEsencias.setSize(this.tarimaEsencias.width ,this.tarimaEsencias.height/3 - 50).setOffset(0,this.tarimaEsencias.height- (this.tarimaEsencias.height/3 -50))
        this.tarimaEsencias.body.setImmovable(true) 


        this.cinta = this.create(4260, 1018, 'cinta').setOrigin(0,0).setScale(1.3).setDepth(3) 
        this.cinta.setSize(this.cinta.width -120,this.cinta.height-46).setOffset(100,106)
        this.cinta.body.setImmovable(true)
        this.enfriadora = this.create(3060, 595, 'enfriadora').setOrigin(0,0).setScale(1.3)
        this.enfriadora.setSize(this.enfriadora.width -100,this.enfriadora.height/6 -50 ).setOffset(50,this.enfriadora.height-(this.enfriadora.height/6 -20))
        this.enfriadora.body.setImmovable(true)
        this.molde = this.create(2930, 1360, 'molde').setOrigin(0,0).setScale(1.3)
        this.molde.setSize(this.molde.width -80,this.molde.height/3 +40 ).setOffset(10,this.molde.height-(this.molde.height/3 ))
        this.molde.body.setImmovable(true)
        this.enroladora = this.create(2163, 1338, 'enroladora').setOrigin(0,0).setScale(1.3)
        this.enroladora.setSize(this.enroladora.width -100,this.enroladora.height/3 -40 ).setOffset(50,this.enroladora.height-(this.enroladora.height/3 -20))
        this.enroladora.body.setImmovable(true) 



        this.mate.anims.create({
            key: "mate",  //nombre de la animacion
            frames: this.mate.anims.generateFrameNumbers("mate"), //nombre del spritesheet
            frameRate: 10,
            repeat: -1
        });

        this.caramelos.anims.create({
            key: "caramelos",  //nombre de la animacion
            frames: this.caramelos.anims.generateFrameNumbers("caramelos"), //nombre del spritesheet
            frameRate: 10,
            repeat: -1
        });
        this.sombra1.anims.create({
            key: "sombra",  //nombre de la animacion
            frames: this.sombra1.anims.generateFrameNumbers("sombra"), //nombre del spritesheet
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: "explosion",  //nombre de la animacion
            frames: this.scene.anims.generateFrameNumbers("explosion"), //nombre del spritesheet
            //frameRate:150, 
            repeat:0 ,
            duration: 700,
            hideOnComplete: true
        })

        this.mate.anims.play('mate', true)
        this.caramelos.anims.play('caramelos', true)
        this.sombra1.anims.play('sombra', true)


/*         //// poligonos de colision de las paredes diagonales

        /// pared de atras de todo
        this.puntos1 = [ 0,0, 500,0, 1816,1204, 1289,1208 ]; // coordenadas de cada vertice del poligono ([x,y, x,y, ...])
        this.poligono1 = Phaser.Geom.Polygon.Translate(new Phaser.Geom.Polygon(this.puntos1), 3791, 565) //creo un poligono invisible
        //this.poligonoo = escena.add.polygon(2766, 1081, this.puntos1, 0x6666ff).setOrigin(0).setDepth(4); // para dibujar el poligono

        // pared de adelante 
        this.puntos2 = [ 0,0, 500,0, 1648,1210, 1129,1208 ]; 
        this.poligono2 = Phaser.Geom.Polygon.Translate(new Phaser.Geom.Polygon(this.puntos2), -515, 565) 
 */


    }

/*     colisionParedDiagonal(personajes, poligono){ // compruebo si hay colision con el poligono que representa al area de colision 
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
 */

/// lanzamiento de la carreta ----------------------------------------------------------------------

lanzaCarreta(escena){ 


    escena.physics.moveToObject(escena.carreta, escena.jugador, 600 * escena.escala);

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
            this.sound.play('golpeCarreta', { volume: 5 })
            //ejecuto directamente la animacion, en vez de cambiar el estado del jugador, porque cuando cambiaba el estado me daba error :P
        }
    
        this.barrasVida.barraJugador.displayWidth = this.jugador.vidas;


    }


}


mostrarLlave(escena){

    this.llave = escena.physics.add.sprite(escena.jugador.x - 200 * escena.escala, escena.jugador.y - 50 * escena.escala , 'llave') . setScale(0.5 * escena.escala).setDepth(3).setSize(50,50) 
    this.sombra = escena.physics.add.sprite(escena.jugador.x - 190 * escena.escala, escena.jugador.y + 100 * escena.escala, 'sombra')  . setScale(1.8 * escena.escala).setDepth(1)
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

tomaMate( mate, hitbox){


    mate.destroy()
    this.items3.sombra1.destroy()
    this.sound.play('tomaMate', { volume: 8 })
    this.jugador.vidas = this.jugador.vidas + 50
    

}
comeCaramelos( caramelos, hitbox){


    caramelos.destroy()
    this.sound.play('comer', { volume: 8 })
    this.jugador.vidas = this.jugador.vidas + 50
    

}






        

    

}