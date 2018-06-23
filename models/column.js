class Column {
    constructor(index, game) {
        this.index = index;
        this.game = game;

        this.cells = []; // holds the cells for 'this' Column
        this.div = this.createDiv(); // column 'div' for Client use
    }

    createDiv() {
        const col = document.createElement('div');
        col.className = 'column';
        col.setAttribute('column', this.index);
        col.addEventListener('click', () => this.dropPiece());

        return col;
    }

    populateCells() { // populates the column with Cell objects
        for(let row = 0; row < 6; ++row) {
            const cell = new Cell(this.index, row);
            this.cells.push(cell);
            this.div.append(cell.div); // populate the Cell divs into the Column div
        }
    }

    emptyCells() { // empties all cells in 'this' Column
        this.cells.forEach(cell => cell.empty());
    }

    dropPiece() { // finds the next lowest Cell in 'this' Column and "drops" a piece 
        let row = this.cells.length - 1;
        let cell = this.cells[row];

        while (cell.piece !== null) { // decrements until finding an available Cell
            if (row === 0) return; // prevent pieces from overlapping at the top
            --row;
            cell = this.cells[row];
        }
        
        cell.occupy(this.game.currentPlayer); // occupies the available Cell with the Player's color
        this.game.update();
    }
}
