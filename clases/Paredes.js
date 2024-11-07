//Areas estaticas e invisibles de colision, que representan las paredes del escenario

export default class Paredes extends Phaser.Physics.Arcade.StaticGroup {
    constructor(fisicas, escena) {
        super(fisicas, escena);

        this.pared_arriba = this.create(0, 0, 'nada');
        this.pared_arriba.body.setSize(5214, 583, 0, 0);

        this.pared_abajo = this.create(360, 910, 'nada');
        this.pared_abajo.body.setSize(5214, 22, 0, 0);

        this.estante1 = this.create(1820,0, 'nada');
        this.estante1.body.setSize(1580 , 635, 0, 0);

        this.estante2 = this.create(4330,0, 'nada');
        this.estante2.body.setSize(787 , 635, 0, 0);

        
        this.paredInicio = this.create(20,533, 'nada');
        this.paredInicio.body.setSize(250 , 400, 0, 0);


        this.paredFinal = this.create(5340,430, 'nada');
        this.paredFinal.body.setSize(100 , 500, 0, 0);
       
    
    }
}
