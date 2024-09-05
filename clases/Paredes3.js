export default class Paredes3 extends Phaser.Physics.Arcade.StaticGroup {
    constructor(fisicas, escena) {
        super(fisicas, escena);

        this.pared_arriba = this.create(0, 0);
        this.pared_arriba.body.setSize(5214, 600, 0, 0);

        this.pared_abajo = this.create(16, 1780);
        this.pared_abajo.body.setSize(5214, 22, 0, 0);

        // lado izquierdo de la puerta de sala de envasado
        this.pared_A = this.create(2161, 478);
        this.pared_A.body.setSize(172, 230, 0, 0);
        this.pared_A2 = this.create(2223, 561);
        this.pared_A2.body.setSize(310, 237, 0, 0);












       
    
    }
}