export default class Items extends Phaser.Physics.Arcade.Group {
    constructor(fisicas, escena) {
        super(fisicas, escena);


        this.costadoPorton = this.create(1598, 100, 'costadoPorton').setOrigin(0,0)
            .setScale(2.2)
        this.costadoPorton.body
            .setImmovable(true)
            .setSize(this.costadoPorton.width -50, this.costadoPorton.height - 300 , 0 , 0) //tamaño del area de colision(achico el area)
            .setOffset(50,315) // corrimiento (x,y) del area de colision (corro el area hacia abajo y un poco a la derecha)


        this.bolsaBasura = this.create(1340,510, 'bolsaBasura')
            .setScale(2.2)
        this.bolsaBasura.body
            .setImmovable(true)
            .setSize(this.bolsaBasura.width  , this.bolsaBasura.height - 10 )
            

        this.porton = this.create(1505, 498, 'porton')
            .setScale(2.2)
        this.porton.body
            .setImmovable(true)
            .setSize(this.porton.width - 50, this.porton.height   )
            .setOffset(50,5)


        this.heladera = this.create(3944, 418, 'heladera')
            .setScale(2.2)
            .setDepth(-1) // para que el sprite de la heladera abierta no quede por debajo
        this.heladera.body
            .setImmovable(true)
            .setSize(this.heladera.width , this.heladera.height )
 

        this.heladeraAbierta = this.create(4030, 460, 'heladeraAbierta')
            .setScale(2.3)
            .setDepth(-1)
            .setVisible(false)

        this.leche = this.create(3967, 700, 'leche')
            .setScale(0.5)
            .setVisible(false)
        this.leche.body
            .setSize(this.leche.width , this.leche.height - 300 )
            .setOffset(0,400)
        this.leche.state = 'sin beber'

        this.sombra = this.create(3967, 848, 'sombra')
            .setScale(1.7)
            .setVisible(false)



        this.puertaNegocio = this.create(3640, 370, 'puertaNegocio')
            .setScale(2.2)
        this.puertaNegocio.body
            .setImmovable(true)
            .setSize(this.puertaNegocio.width * 2.2 , this.puertaNegocio.height * 2.2 )
            .setOffset(-70,-100)
       
        this.cargarAnimaciones(this.bolsaBasura, this.porton, this.leche, this.sombra);   
        this.cargarListener(this.bolsaBasura, this.porton);
       
    
    }


    cargarAnimaciones(bolsaBasura, porton, leche, sombra){
        bolsaBasura.anims.create({
            key: "explosion",  //nombre de la animacion
            frames: bolsaBasura.anims.generateFrameNumbers("explosion"), //nombre del spritesheet
            frameRate:15, 
            repeat:0 
        });
        porton.anims.create({
            key: "portonRoto",  //nombre de la animacion
            frames: porton.anims.generateFrameNumbers("portonRoto"), //nombre del spritesheet
            frameRate:10, 
            repeat:0 
        });
        leche.anims.create({
            key: "leche",  //nombre de la animacion
            frames: porton.anims.generateFrameNumbers("leche"), //nombre del spritesheet
            frameRate:10, 
            repeat:-1 
        });
        sombra.anims.create({
            key: "sombra",  //nombre de la animacion
            frames: porton.anims.generateFrameNumbers("sombra"), //nombre del spritesheet
            frameRate:10, 
            repeat:-1 
        });



    }

    cargarListener(bolsaBasura, porton){

        bolsaBasura.on('animationcomplete', () => {bolsaBasura.destroy();});
        porton.on('animationcomplete', () => {porton.destroy();});

        

    }



    golpe (objetoGolpeado, hitbox){

   

        if ((this.jugador.state == 'patada' && (this.jugador.anims.getFrameName()== 31 || this.jugador.anims.getFrameName()== 32)) || 
        (this.jugador.state == 'pinia' && (this.jugador.anims.getFrameName()== 45 || this.jugador.anims.getFrameName()== 46)) &&
        objetoGolpeado.active ){

            if ((hitbox.name == 'hitboxPinia' && this.jugador.state == 'pinia') || 
                (hitbox.name == 'hitboxPatada' && this.jugador.state == 'patada') ){

                    

                    if (objetoGolpeado.texture.key == 'bolsaBasura')  {this.items.bolsaBasura.anims.play("explosion", true); }

                    if (objetoGolpeado.texture.key == 'porton')  {this.items.porton.anims.play("portonRoto", true); }
        
                    if (objetoGolpeado.texture.key == 'heladera' && this.items.leche.state == 'sin beber')  {
                        this.items.heladeraAbierta.setVisible(true)
                        this.items.leche.setVisible(true).anims.play('leche', true)
                        this.items.sombra.setVisible(true).anims.play('sombra', true)
                    }




            }





            




        }
        




    }

    tomaLechita(jugador, sombra){

        if (this.items.leche.visible == true){

        this.items.leche.setVisible(false);
        sombra.setVisible(false);
        this.items.leche.state = 'bebida'
        
        }
        

    }




    actualizarProfundidad(jugador){

        if (this.costadoPorton.body.y > jugador.body.y){ this.costadoPorton.setDepth(1);} else { this.costadoPorton.setDepth(-1);}
        if (this.leche.body.y > jugador.body.y){ this.leche.setDepth(1);} else { this.leche.setDepth(-1);}
   
        


    }


}