class Player {
    constructor(name, color) {
        this.name = name;
        this.color = color;
        this.wins = 0;
    }

    incrementWins() {
        ++this.wins;
    }
}

class Cell {
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

class Column {
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

class Client {
    constructor(game) {
        this.game = game;

        this.columns = [];
        this.currentPlayer = this.game.currentPlayer;

        this.appendBoard();
    }

    appendBoard() {
        const boardElement = document.querySelector('#board');
        for (let col = 0; col < 7; ++col) {
            const column = new Column(this, col);

            this.columns.push(column);
            boardElement.append(column.div);
        }
    }

    updatePlayer(player) {
        this.currentPlayer = player;
    }

    clearBoard() {
        this.columns.forEach(column => column.emptyCells());        
    }
}

class ConnectFour {
    constructor(playerOne = null, playerTwo = null) {
        this.client = null;
        this.analyzer = null;

        this.playerOne = playerOne || new Player('Player One', 'red');
        this.playerTwo = playerTwo || new Player('Player Two', 'black');
        this.currentPlayer = this.playerOne;
        this.winner = null;

        this.gameState = this.generateGameState();
    };

    setup() {
        this.gameState = this.generateGameState();
        this.analyzer = new GameAnalyzer(this);
        this.client = new Client(this);

        const resetButton = document.querySelector('#reset');
        resetButton.addEventListener('click', () => this.reset());
    }

    generateGameState() {
        const board = [];
        for(let i = 0; i < 6; ++i) {
            const row = [];
            for (let j = 0; j < 7; ++j) row.push(null);
            board.push(row);
        }
        return board;
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === this.playerOne ?
            this.playerTwo :
            this.playerOne;

        this.client.updatePlayer(this.currentPlayer);
    }

    placePiece(column, row) {
        this.gameState[row][column] = this.currentPlayer;
        const result = this.analyzer.checkWinner();
        if (result) {
            const { player, path } = result;
            player.incrementWins();

            const winnerDiv = document.querySelector('#winner');
            winnerDiv.append(`WINNER! ${player.name}. Number of wins: ${player.wins}`);
        }
        this.switchPlayer();
    }

    reset() {
        this.gameState = this.generateGameState();
        this.client.clearBoard();
    }
}

class GameAnalyzer {
    constructor(game) {
        this.game = game;
    }
    
    checkRowAndColumn(board, column, row) {
        if (column >= 4) {
            if (row === board.length - 1) return false;
            return this.checkRowAndColumn(board, 0, row + 1);
        }
    
        const player = board[row][column];
    
        const columnWinner = this.checkColumn(board, column, row);
        if (columnWinner) return columnWinner;

        if (player === null) return this.checkRowAndColumn(board, column + 1, row);

        if (
            board[row][column + 1] === player &&
            board[row][column + 2] === player &&
            board[row][column + 3] === player
        ) return {
            player,
            path: {
                row,
                start: column,
                end: column + 3
            },
        };
    
        return this.checkRowAndColumn(board, column + 1, row);
    }

    checkColumn(board, column, row) {
        if (row >= 3) return false;
    
        const player = board[row][column];
        if (player === null) return this.checkColumn(board, column, row + 1);
    
        if (
            board[row + 1][column] === player &&
            board[row + 2][column] === player &&
            board[row + 3][column] === player
        ) return {
            player,
            path: {
                column,
                start: row,
                end: row + 3
            },
        };
    
        return this.checkColumn(board, column, row + 1);  
    }

    checkWinner() {
        return this.checkRowAndColumn(this.game.gameState, 0, 0);
    }
}

window.addEventListener('load', () => {
    const game = new ConnectFour();
    game.setup();
});