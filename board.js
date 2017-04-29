$(document).ready(function () {
    $('button').click(function () {
        var statki = $('#statki').val();
        var arr = JSON.parse("[" + statki + "]");
        var game = new Game(arr);
        game.Start();
    });
});
class Board {
    constructor(boardSizeX, boardSizeY) {
        this.jqboard = $('#board');
        this.sizeX = boardSizeX;
        this.sizeY = boardSizeY;
        this.createBoard();
    }
    GetX() {
        return this.sizeX;
    }
    GetY() {
        return this.sizeY;
    }
    AddShip(pos) {
        this.board[pos.X][pos.Y] = pos;
        $('.cell.X-' + pos.X + '.Y-' + pos.Y).addClass('ship');
    }
    HitShip(X, Y) {
    }
    CheckGameStatus() {
    }
    CheckIfCanAdd(pos, first) {
        var state = {
            own: 0,
            enemy: 0,
            empty: 0
        };
        if (this.board[pos.X][pos.Y] == null)
            state.empty = 1;
        this.CheckClosePositions(pos.X - 1, pos.Y - 1, pos.shipId, state, true);
        this.CheckClosePositions(pos.X - 1, pos.Y, pos.shipId, state, false);
        this.CheckClosePositions(pos.X - 1, pos.Y + 1, pos.shipId, state, true);
        this.CheckClosePositions(pos.X, pos.Y - 1, pos.shipId, state, false);
        this.CheckClosePositions(pos.X, pos.Y + 1, pos.shipId, state, false);
        this.CheckClosePositions(pos.X + 1, pos.Y - 1, pos.shipId, state, true);
        this.CheckClosePositions(pos.X + 1, pos.Y, pos.shipId, state, false);
        this.CheckClosePositions(pos.X + 1, pos.Y + 1, pos.shipId, state, true);
        if (first == true && state.empty == 1 && state.enemy == 0)
            return true;
        if (first == false && state.empty == 1 && state.enemy == 0 && state.own > 0)
            return true;
        return false;
    }
    CheckClosePositions(X, Y, shipId, state, bevel) {
        if (X > 20 || X < 1 || Y > 20 || Y < 1)
            return;
        if (this.board[X][Y] !== null && this.board[X][Y].shipId == shipId && bevel == false)
            state.own += 1;
        if (this.board[X][Y] !== null && this.board[X][Y].shipId != shipId)
            state.enemy += 1;
    }
    createBoard() {
        this.jqboard.html('');
        this.board = new Array();
        for (var i = 1; i <= this.sizeX; i++) {
            var row = new Array();
            for (var j = 1; j <= this.sizeY; j++) {
                row[j] = null;
                this.createCell(i, j);
            }
            this.board[i] = row;
        }
    }
    createCell(X, Y) {
        var cell = "<div class='cell X-" + X + " Y-" + Y + "'></div>";
        this.jqboard.append(cell);
    }
}
function addPanel(title, content) {
    var html = '<div class="panel panel-primary">' +
        '<div class="panel-heading">' + title + '</div>' +
        '<div class="panel-body">' + content + '</div></div>';
    $('#placeholder').append(html);
}
var FieldStatus;
(function (FieldStatus) {
    FieldStatus[FieldStatus["EMPTY"] = 0] = "EMPTY";
    FieldStatus[FieldStatus["OWN"] = 1] = "OWN";
    FieldStatus[FieldStatus["ENEMY"] = 2] = "ENEMY";
})(FieldStatus || (FieldStatus = {}));
function testF() {
}
class TestEvent {
}
//# sourceMappingURL=board.js.map