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


        this.puertaNegocio = this.create(3640, 370, 'puertaNegocio')
            .setScale(2.2)
        this.puertaNegocio.body
            .setImmovable(true)
            .setSize(this.puertaNegocio.width , this.puertaNegocio.height + 5 )


        this.leche = this.create(3967, 700, 'leche')
            .setScale(0.5)
            .setVisible(false)
        this.leche.body
            .setSize(this.leche.width, this.leche.height - 300)
            .setOffset(0, 400)
        this.leche.state = 'sin beber'

        this.sombra = this.create(3967, 848, 'sombra')
            .setScale(1.7)
            .setVisible(false)

        this.galletitas = this.create(4380, 260, 'galletitas')
            .setScale(0.4)
        this.galletitas.body
            .setSize(this.galletitas.width + 200, this.galletitas.height + 200)

        this.sombra2 = this.create(4385, 400, 'sombra')
            .setScale(1.7)
      


        if (escena.escenaAnterior == 'escena2'){  // esto lo hago para que los alimentos que dan vida, no vuelvan a aparecer 
                    //cada vez que ingreso a la escena. Y evitar que el jugador haga trampa.


            this.heladera.body.setEnable(false)  //inhabilito el body, con lo cual no habrá interaccion con el jugador 
                                                //(se deshabilita el overlap())
            this.galletitas.body.setEnable(false)
            this.galletitas.setVisible(false) //inhabilito las galletitas, y las hago invisibles

            this.sombra2.setVisible(false)

            this.porton.body.setEnable(false)
            this.porton.setVisible(false)
        }





        



        this.cargarAnimaciones(escena, this.bolsaBasura, this.porton, this.leche, this.sombra, this.galletitas, this.sombra2 );   
        this.cargarListener(this.bolsaBasura, this.porton);
       
    

    }


    cargarAnimaciones(escena, bolsaBasura, porton, leche, sombra, galletitas, sombra2){
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
            frames: leche.anims.generateFrameNumbers("leche"), //nombre del spritesheet
            frameRate: 10,
            repeat: -1
        });
        sombra.anims.create({
            key: "sombra",  //nombre de la animacion
            frames: sombra.anims.generateFrameNumbers("sombra"), //nombre del spritesheet
            frameRate: 10,
            repeat: -1
        });
        galletitas.anims.create({
            key: "galletitas",  //nombre de la animacion
            frames: galletitas.anims.generateFrameNumbers("galletitas"), //nombre del spritesheet
            frameRate: 10,
            repeat: -1
        });
        sombra2.anims.create({
            key: "sombra2",  //nombre de la animacion
            frames: sombra.anims.generateFrameNumbers("sombra"), //nombre del spritesheet
            frameRate: 10,
            repeat: -1
        });


        galletitas.anims.play('galletitas', true)

        sombra2.anims.play('sombra2', true)



    }

    cargarListener(bolsaBasura, porton){

        bolsaBasura.on('animationcomplete', () => {bolsaBasura.destroy();});
        porton.on('animationcomplete', () => {porton.destroy();});

        

    }



    cartelInicial(escena){

        escena.sound.play('advertencia', { volume: 1 })

        this.centrarX = escena.cameras.main.worldView.x + escena.cameras.main.width / 2;
        //a la posicion de la camara en el escenario (en el mundo del juego), le sumo el ancho de la camara 
        //(osea lo que estoy viendo en pantalla) , dividido en 2, para que quede en el centro del eje x.
        this.centrarY = escena.cameras.main.worldView.y + escena.cameras.main.height / 2;

        this.cartel = this.create(this.centrarX, this.centrarY , 'cartelInicial') . setScale(2.3 * escena.escala).setDepth(3)
        this.botonAceptar = this.create(this.centrarX, this.centrarY + 135 , 'aceptar') .setScale(2.3 * escena.escala, 1.1 ).setDepth(3)



        this.botonAceptar.setInteractive().on("pointerdown",function() {  
            
            escena.items.cartel.destroy()      
            escena.items.botonAceptar.destroy(); 
            escena.physics.resume();


        })

        escena.physics.pause()


    }

    golpe (objetoGolpeado, hitbox){

   

        if ((this.jugador.state == 'patada' && (this.jugador.anims.getFrameName()== 31 || this.jugador.anims.getFrameName()== 32)) || 
        (this.jugador.state == 'pinia' && (this.jugador.anims.getFrameName()== 45 || this.jugador.anims.getFrameName()== 46)) &&
        objetoGolpeado.active ){

            if ((hitbox.name == 'hitboxPinia' && this.jugador.state == 'pinia') || 
                (hitbox.name == 'hitboxPatada' && this.jugador.state == 'patada') ){



                    if (objetoGolpeado.texture.key == 'bolsaBasura')  {
                        
                        this.items.bolsaBasura.anims.play("explosion", true); 
                        this.sound.play('explosion', { volume: 8 })

                    }

                    if (objetoGolpeado.texture.key == 'porton')  {
                        
                        this.items.porton.anims.play("portonRoto", true); 
                        this.sound.play('puertaRota', { volume: 15 })
                    }
        
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
        this.sound.play('comer', { volume: 5 })
        jugador.vidas = jugador.vidas + 50

        }
        

    }

    comeGalletitas( galletitas, hitbox){


        galletitas.destroy()
        this.items.sombra2.destroy()
        this.sound.play('comer', { volume: 5 })
        this.jugador.vidas = this.jugador.vidas + 50
        

    }

    golpeaCaja(escena){

        escena.jugador.vidas =  escena.jugador.vidas - 40 ;

        if (escena.jugador.vidas <= 0) {  //si las vidas llegaron a cero
            escena.jugador.vidas = 0  // para que 'jugador.vidas' no sea un valor negativo
            escena.jugador.state = 'muerto'
        }else{
            escena.jugador.anims.play('heridoAlto',true); 
            escena.sound.play('golpeAlto', { volume: 8 })
            //ejecuto directamente la animacion, en vez de cambiar el estado del jugador, porque cuando cambiaba el estado me daba error :P
        }

        escena.barrasVida.barraJugador.displayWidth = escena.jugador.vidas;


    }

    
    cartelDesayuno(escena){

        escena.sound.play('advertencia', { volume: 1 })

        this.centrarX = escena.cameras.main.worldView.x + escena.cameras.main.width / 2;
        //a la posicion de la camara en el escenario (en el mundo del juego), le sumo el ancho de la camara 
        //(osea lo que estoy viendo en pantalla) , dividido en 2, para que quede en el centro del eje x.
        this.centrarY = escena.cameras.main.worldView.y + escena.cameras.main.height / 2;

        this.flecha = this.create(3944 * escena.escala, 300 * escena.escala , 'flecha') .setAngle(-90). setScale(0.3 * escena.escala)
        this.cartel1 = this.create(this.centrarX, this.centrarY , 'cartel1') . setScale(2.3 * escena.escala).setDepth(3)
        this.botonAceptar = this.create(this.centrarX, this.centrarY + 170 * escena.escala , 'aceptar') .setScale(2.3 * escena.escala).setDepth(3)


        this.flecha.anims.create({
            key: "flecha",  //nombre de la animacion
            frames: this.flecha.anims.generateFrameNumbers("flecha"), 
            frameRate:10, 
            repeat:-1 

        });

        this.flecha.anims.play('flecha', true)

        this.botonAceptar.setInteractive().on("pointerdown",function() {  
            
            escena.physics.resume();
            escena.items.flecha.destroy();
            escena.items.cartel1.destroy();
            escena.items.botonAceptar.destroy();


        
        
        })

        escena.juegoPausado = true

        escena.physics.pause()  // pausar el movimiento de los gameObjects de la escena
        //escena.jugador.body.moves = false;

    }

    compruebaLLaveNegocio(puerta, jugador){


        if (this.llaveNegocio == true ){ 
            // si el jugador posee la llave del negocio, se podra ingresar a la escena 4 (negocio)

            //pero antes debo reducir a los repositores...
            if (this.banderaPasar == true) {

                //detengo la musica 
                this.sound.stopAll()



                //elimino del texture manager las texturas que no volveré a utilizar, para liberar memoria

/*                 this.game.textures.remove('bolsaBasura')
                this.game.textures.remove('costadoPorton')
                this.game.textures.remove('porton')
                this.game.textures.remove('puertaNegocio')
                this.game.textures.remove('fondo') */

                // ademas elimino audio que no vuelvo a usar

                this.cache.audio.remove('musicaNivel12y3')

/*                 // elimino escenas que no voy a utilizar , para liberar memoria

                this.scene.remove('escena2') //elimino la intro del juego
                this.scene.remove('escena1')  //elimino el escenario3 */



                this.scene.start('escena4', { vidas: this.jugador.vidas , escenaAnterior: this.scene.key, jugadorElegido: this.jugadorElegido})
            
            
            }

        }else{  //si no, se muestra un cartel
        
            if (this.banderaNegocio == true){  // para que aparezca el cartel solo una vez

            this.banderaNegocio = false

            this.sound.play('advertencia', { volume: 1 })

            this.items.centrarX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
            this.items.centrarY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

            if (this.jugadorElegido == 'diego' ){ //si el jugador elegido es Diego, la llave del negocio la tendrá Nico.
                //Osea mostraré el 'cartel3'

                this.items.cartel2 = this.items.create(this.items.centrarX, this.items.centrarY , 'cartel3') . setScale(2.3 * this.escala).setDepth(3)

            }else{

                this.items.cartel2 = this.items.create(this.items.centrarX, this.items.centrarY , 'cartel2') . setScale(2.3 * this.escala).setDepth(3)

            }


            this.items.botonAceptar2 = this.items.create(this.items.centrarX, this.items.centrarY + 170 * this.escala, 'aceptar') .setScale(2.3 * this.escala).setDepth(3)

            this.items.botonAceptar2.setInteractive().on("pointerdown",function() {  
                
                this.scene.physics.resume();
                this.scene.items.cartel2.destroy();
                this.scene.items.botonAceptar2.destroy();

            })

            this.physics.pause()

            }

        }


    }




/*     actualizarProfundidad(jugador){

        if (this.costadoPorton.body.y > jugador.body.y){ this.costadoPorton.setDepth(1);} else { this.costadoPorton.setDepth(-1);}
        if (this.leche.body.y > jugador.body.y){ this.leche.setDepth(1);} else { this.leche.setDepth(-1);}
   
        


    } */


}