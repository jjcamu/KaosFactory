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


        // paredes laterales

        this.pared_izq = this.create(0, 580);
        this.pared_izq.body.setSize(50, 1200, 0, 0);


        this.pared_der1 = this.create(4800, 1370);
        this.pared_der1.body.setSize(150, 200, 0, 0);

        this.pared_der2 = this.create(4950, 1600);
        this.pared_der2.body.setSize(150, 200, 0, 0);

        this.pared_der1a = this.create(3925, 560);
        this.pared_der1a.body.setSize(150, 200, 0, 0);

        this.pared_der1aa = this.create(4070, 600);
        this.pared_der1aa.body.setSize(150, 200, 0, 0);

        this.pared_der2a = this.create(4200, 790);
        this.pared_der2a.body.setSize(150, 200, 0, 0);

        this.pared_der3a = this.create(4350, 880);
        this.pared_der3a.body.setSize(150, 400, 0, 0);


        //area donde se desactivan los golpes entre enemigos y jugador
        //(al haber una pared entre enemigo y jugador, no deberian poder golpearse entre si)
        escena.areaDesactiva = escena.physics.add.sprite(2691, 934);
        escena.areaDesactiva.body.setSize(1680, 210, 0, 0);




       
    
    }
}