export default class Cell {
    constructor(column, row) {
        this.row = row;
        this.column = column;
        this.playerPiece = null;
        this.div = this.generateDiv();
    }

    occupy(player) {
        this.playerPiece = this.generatePieceDiv(player);
        this.div.append(this.playerPiece);
    }

    generateDiv() {
        const cellDiv = document.createElement('div');
        cellDiv.className = 'cell';
        cellDiv.setAttribute('row', this.row);
        cellDiv.setAttribute('column', this.column.index);

        return cellDiv;
    }

    generatePieceDiv(player) {
        const pieceDiv = document.createElement('div');
        pieceDiv.className = 'game-piece';
        pieceDiv.style = `background-color: ${player.color}`

        return pieceDiv;
    }

    empty() {
        this.playerPiece = null;
        this.div.innerHTML = '';
    }
}
