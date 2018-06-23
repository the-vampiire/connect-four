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

    declareWinner(winnerData) {
        console.log(winnerData);
    }
}
