export default class Paredes2 extends Phaser.Physics.Arcade.StaticGroup {
    constructor(fisicas, escena) {
        super(fisicas, escena);

        this.pared_arriba = this.create(9, 451); // posicion x , y
        this.pared_arriba.body.setSize(4160, 440, 0, 0); // ancho, alto , 0 , 0
        this.pared_arriba.name = 'pepito'

        this.pared_arriba2 = this.create(4138, 330);
        this.pared_arriba2.body.setSize(1797, 385, 0, 0);

        this.pared_diagonal_1 = this.create(6022, 627);

        this.pared_diagonal_1.setSize(151, 180, 0, 0);

        this.pared_diagonal_2 = this.create(6188, 739);
        this.pared_diagonal_2.setSize(151, 180, 0, 0);

        this.pared_diagonal_3 = this.create(6600, 1073);
        this.pared_diagonal_3.setSize(151, 220, 0, 0);

        this.pared_diagonal_4 = this.create(6690, 1182);
        this.pared_diagonal_4.setSize(151, 180, 0, 0);

        this.pared_diagonal_5 = this.create(6780, 1260);
        this.pared_diagonal_5.setSize(151, 180, 0, 0);

        this.pared_diagonal_6 = this.create(7008, 1341);
        this.pared_diagonal_6.setSize(151, 300, 0, 0);

        this.pared_diagonal_7 = this.create(6913, 1341);
        this.pared_diagonal_7.setSize(151, 180, 0, 0);

        this.pared_diagonal_8 = this.create(6277, 900);
        this.pared_diagonal_8.setSize(50, 100, 0, 0);

        this.pared_abajo = this.create(0, 1920);
        this.pared_abajo.body.setSize(4240, 100, 0, 0);

        this.pared_abajo2 = this.create(4143, 1680);
        this.pared_abajo2.body.setSize(3015, 300, 0, 0);

        this.tarima = this.create(490, 840);
        this.tarima.body.setSize(305, 110, 0, 0);

        this.estante1 = this.create(1000, 840);
        this.estante1.body.setSize(775, 110, 0, 0);

        this.estante2 = this.create(2230, 840);
        this.estante2.body.setSize(775, 110, 0, 0);

        this.estante3 = this.create(3220, 840);
        this.estante3.body.setSize(775, 140, 0, 0);

        this.tostador = this.create(5200, 648);
        this.tostador.setSize(462, 180, 0, 0);

        this.apiladora = this.create(1104, 840);
        this.apiladora.setSize(294, 175, 0, 0);

        this.paredIzquierda = this.create(-60, 800);
        this.paredIzquierda.setSize(10, 1100, 0, 0);

        
        this.paredDerecha = this.create(6310, 970);
        this.paredDerecha.setSize(320, 80, 0, 0);




    
    }
}