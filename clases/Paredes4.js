export default class Paredes4 extends Phaser.Physics.Arcade.StaticGroup {
    constructor(fisicas, escena) {
        super(fisicas, escena);

        this.pared_arriba = this.create(-50, 432);
        this.pared_arriba.body.setSize(1400, 20, 0, 0);
  
        this.pared_abajo = this.create(570, 1190);
        this.pared_abajo.body.setSize(1400, 20, 0, 0);



        this.pared_izq1 = this.create(-50, 432);
        this.pared_izq1.body.setSize(200, 250, 0, 0);

        this.pared_izq2 = this.create(150, 682);
        this.pared_izq2.body.setSize(200, 250, 0, 0);

        this.pared_izq3 = this.create(350, 932);
        this.pared_izq3.body.setSize(200, 250, 0, 0);


        this.pared_der1 = this.create(1310, 492);
        this.pared_der1.body.setSize(200, 250, 0, 0);

        this.pared_der1b = this.create(1225, 433);
        this.pared_der1b.body.setSize(60, 100, 0, 0);

        this.pared_der2 = this.create(1570, 722);
        this.pared_der2.body.setSize(200, 250, 0, 0);

        this.pared_der2b = this.create(1470, 700);
        this.pared_der2b.body.setSize(60, 100, 0, 0);

        this.pared_der3 = this.create(1830, 992);
        this.pared_der3.body.setSize(200, 250, 0, 0);







       
    
    }
}