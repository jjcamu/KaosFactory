//Areas estaticas e invisibles de colision, que representan las paredes del escenario

export default class Paredes extends Phaser.Physics.Arcade.StaticGroup {
    constructor(fisicas, escena) {
        super(fisicas, escena);

        this.pared_arriba = this.create(0, 0);
        this.pared_arriba.body.setSize(5214, 583, 0, 0);

        this.pared_abajo = this.create(0, 946);
        this.pared_abajo.body.setSize(5214, 22, 0, 0);

        this.estante1 = this.create(1820,0);
        this.estante1.body.setSize(1580 , 635, 0, 0);

        this.estante2 = this.create(4330,0);
        this.estante2.body.setSize(787 , 635, 0, 0);



       
    
    }
}
