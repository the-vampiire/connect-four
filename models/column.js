export default class Column {
    constructor(client, index) {
        this.client = client;
        this.index = index;
        this.cells = [];
        this.div = this.generateDiv();

        this.populateCells();
    }

    generateDiv() {
        const col = document.createElement('div');
        col.className = 'column';
        col.setAttribute('column', this.index);
        col.addEventListener('click', () => this.dropPiece());

        return col;
    }

    populateCells() {
        for(let row = 0; row < 6; ++row) {
            const cell = new Cell(this, row);
            this.cells.push(cell);
            this.div.append(cell.div);
        }
    }

    dropPiece() {
        let row = this.cells.length - 1;
        let cell = this.cells[row];

        while (cell.playerPiece !== null) {
            if (row === 0) return; // prevent pieces from overlapping
            row--;
            cell = this.cells[row];
        }

        cell.occupy(this.client.currentPlayer);
        this.client.game.placePiece(cell.column.index, cell.row);
    }

    emptyCells() {
        this.cells.forEach(cell => cell.empty());
    }
}
