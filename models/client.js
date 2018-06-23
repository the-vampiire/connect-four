class Client {
    constructor(game) {
        this.game = game;
        this.createBoard();
    }

    setup() {
        const resetButton = document.querySelector('#reset');
        resetButton.addEventListener('click', () => this.game.reset());
    }

    createBoard() {
        const boardElement = document.querySelector('#board');
        this.game.board.forEach(column => boardElement.append(column.div));
    }

    displayWinner(winner) {
        // console.log(winner);
    }
}
