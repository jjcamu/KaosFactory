export default class Botones extends Phaser.GameObjects.Group {
    constructor(escena, xA, yA, spriteA, xB, yB, spriteB, jugador) {
        super(escena);

        this.botonA = this.create(xA, yA, spriteA)
            .setScale(2.86)
            .setDepth(1)
            .setScrollFactor(0) 

        this.botonB = this.create(xB, yB, spriteB)
            .setScale(2.86)
            .setDepth(1)
            .setScrollFactor(0) 
       
        this.cargarAnimaciones(this.botonA, this.botonB);   
        this.cargarListener(this.botonA, this.botonB, jugador);
       
    
    }

    cargarAnimaciones(botonA, botonB){
        //animaciones del boton (presionado y sin presionar)
        botonA.anims.create({ 
            key: "botonA-apretado", //asigno un nombre a la animacion
            frames: botonA.anims.generateFrameNumbers("botonA",{frames:[1]}) ,//indico que frames del spritesheet 
            //conforman la animacion
            repeat:-1 
        });
        botonA.anims.create({
            key: "botonA", //asigno un nombre a la animacion
            frames: botonA.anims.generateFrameNumbers("botonA",{frames:[0]}), //indico que frames del spritesheet 
            //conforman la animacion
            repeat:1 
        });

        botonB.anims.create({
            key: "botonB-apretado", //asigno un nombre a la animacion
            frames: botonB.anims.generateFrameNumbers("botonB",{frames:[1]}) ,//indico que frames del spritesheet 
            //conforman la animacion
            repeat:-1 
        });
        botonB.anims.create({
            key: "botonB", //asigno un nombre a la animacion
            frames: botonB.anims.generateFrameNumbers("botonB",{frames:[0]}), //indico que frames del spritesheet 
            //conforman la animacion
            repeat:1 
        });

    }

    cargarListener(botonA, botonB, jugador){


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
    }


}