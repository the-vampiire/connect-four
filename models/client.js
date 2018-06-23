class Client {
    constructor(game) {
        this.game = game;

        const resetButton = document.querySelector('#reset');
        resetButton.addEventListener('click', () => this.game.reset()); 
    }

    drawBoard() {
        const boardElement = document.querySelector('#board');
        this.game.board.forEach(column => boardElement.append(column.div));
    }

    displayWinningPath({ row, column, start, end }) {
        const board = this.game.board;
        for (start; start <= end; ++start) {
            const winCol = column !== undefined ? column : start;
            const winRow = row !== undefined ? row : start;

            const piece = board[winCol].cells[winRow].piece;
            piece.div.className += ' win-piece'
        }
    }

    declareWinner({ player, path }) {
        const winnerDiv = document.querySelector('#winner');
        winnerDiv.innerText = `${player.name} WINS! Total wins: ${player.wins}`;

        this.displayWinningPath(path);
    }
}
