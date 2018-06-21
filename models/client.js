export default class Client {
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
