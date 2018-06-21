export default class GameAnalyzer {
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
