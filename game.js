class Ship {
    constructor(board, shipLength) {
        this.shipId = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        this.board = board;
        this.shipLength = shipLength;
    }
    AddShipPositions() {
        var counter = 0;
        this.shipPositions = new Array();
        while (this.shipPositions.length < this.shipLength) {
            var pos = this.getRandomPosition();
            var first = this.shipPositions.length == 0 ? true : false;
            var check = this.board.CheckIfCanAdd(pos, first);
            if (check == true) {
                this.addPosition(pos);
                this.board.AddShip(pos);
            }
            counter++;
            if (counter > 100000)
                break;
        }
        if (this.shipPositions.length == this.shipLength)
            return true;
        return false;
    }
    addPosition(position) {
        this.shipPositions.push(position);
    }
    getRandomPosition() {
        var pos = {
            X: Math.floor(Math.random() * this.board.GetX()) + 1,
            Y: Math.floor(Math.random() * this.board.GetY()) + 1,
            shipId: this.shipId,
            isHit: false
        };
        return pos;
    }
    GetId() {
        return this.shipId;
    }
}
class Game {
    constructor(shipsConfigurator) {
        this.shipsConfigurator = shipsConfigurator;
    }
    Start() {
        this.board = new Board(20, 20);
        this.addShipsToBoard();
    }
    addShipsToBoard() {
        for (var i = 0; i < this.shipsConfigurator.length; i++) {
            var ship = new Ship(this.board, this.shipsConfigurator[i]);
            ship.AddShipPositions();
        }
    }
}
//# sourceMappingURL=game.js.map