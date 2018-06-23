class GameAnalyzer {
    constructor(game) {
        this.game = game;
    }
    
    checkColumns(board) {
        for (let col = 0; col < board.length; ++col) {
            const column = board[col].cells;
            for (let row = 0; row < column.length; ++row) {
                const piece = column[row].piece;
                if (piece === null) continue;
                else if (this.checkNextRows(column, row, piece.player)) return true;
            }
        }
        return false;   
    }

    checkNextRows(column, row, player) {
        if (row >= 3) return false;
        return (
            column[row + 1].piece.player === player &&
            column[row + 2].piece.player === player &&
            column[row + 3].piece.player === player
        );
    }

    checkWinner() {
        // return this.checkRowAndColumn(this.game.board, 0, 0);
        const winner = this.checkColumns(this.game.board);
        console.log(winner);
    }
}
