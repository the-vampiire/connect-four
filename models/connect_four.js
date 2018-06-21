export default class ConnectFour {
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
