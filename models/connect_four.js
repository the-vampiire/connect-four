class ConnectFour {
    constructor(playerOne = null, playerTwo = null) {
        this.client = null;
        this.analyzer = null;

        this.playerOne = playerOne || new Player('Player One', 'red');
        this.playerTwo = playerTwo || new Player('Player Two', 'black');
        this.currentPlayer = this.playerOne;

        this.board = this.generateboard();
    };

    start() {
        this.client = new Client(this);
        this.analyzer = new GameAnalyzer(this);

        this.client.drawBoard();
    }

    update() {
        this.analyzer.checkBoard(this.board);
        this.switchPlayer();
    }

    reset() {
        this.board.forEach(column => column.emptyCells());
        this.client.drawBoard();
    }

    generateboard() {
        const board = [];
        for (let index = 0; index < 7; ++index) {
            const col = new Column(index, this);
            col.populateCells();
            board.push(col);
        }

        return board;
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === this.playerOne ?
            this.playerTwo :
            this.playerOne;
    }
}
