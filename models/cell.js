class Cell {
    constructor(column, row) {
        this.row = row;
        this.column = column;
        this.piece = null;
        this.div = this.generateDiv();
    }

    occupy(player) {
        this.piece = new PlayerPiece(player);
        this.div.append(this.piece.div);
    }

    generateDiv() {
        const cellDiv = document.createElement('div');
        cellDiv.className = 'cell';
        cellDiv.setAttribute('row', this.row);
        cellDiv.setAttribute('column', this.column);

        return cellDiv;
    }

    empty() {
        this.piece = null;
        this.div.innerHTML = '';
    }
}
