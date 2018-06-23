class GameAnalyzer {
    constructor(game) {
        this.game = game;
    }
    
    checkBoard(board) {
        for (let col = 0; col < board.length; ++col) {
            const column = board[col].cells;
            for (let row = 0; row < column.length; ++row) {
                const piece = column[row].piece;
                if (piece === null) continue; // a null piece is empty
                else if ( // check contiguous rows and columns
                    this.winnerInNextRows(board, col, row, piece.player) ||
                    this.winnerInNextColumns(board, col, row, piece.player)
                ) break;
            }
        }
    }

    winnerInNextColumns(board, col, row, currentPlayer) {
        // from column 4 and beyond no winner can be made
        if (col >= 4) return false;

        // define next 3 contiguous pieces
        const pieces = [
            board[col + 1].cells[row].piece,
            board[col + 2].cells[row].piece,
            board[col + 3].cells[row].piece,
        ];

        // if any piece is null (empty) then there is no winner
        if (pieces.some(cell => cell === null)) return false;

        // check the non-null pieces for a match to determine a winner
        if (
            pieces
            .map(piece => piece.player)
            .every(player => player === currentPlayer)
        ) {
            const winnerOutput = {
                player: currentPlayer,
                path: {
                    row,
                    start: col,
                    end: col + 3
                }
            }
            currentPlayer.incrementWins();
            // call Client to declare the winner and winning path
            this.game.client.declareWinner(winnerOutput);
            return true; // return true to break CheckBoard() loop
        }
    }

    winnerInNextRows(board, col, row, currentPlayer) {
        // from row 3 and beyond no winner can be made
        if (row >= 3) return false;

        // check next 3 contiguous rows for a winner
        if (
            board[col].cells[row + 1].piece.player === currentPlayer &&
            board[col].cells[row + 2].piece.player === currentPlayer &&
            board[col].cells[row + 3].piece.player === currentPlayer
        ) {
            const winnerOutput = { 
                player: currentPlayer,
                path: {
                    column: col,
                    start: row,
                    end: row + 3,
                }
            };
            currentPlayer.incrementWins();
            // call Client to declare the winner and winning path
            this.game.client.declareWinner(winnerOutput);
            return true; // return true to break CheckBoard() loop
        }
    }
}
