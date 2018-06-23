class PlayerPiece {
    constructor(player) {
        this.player = player;
        this.div = this.generateDiv();
    }

    generateDiv() {
        const pieceDiv = document.createElement('div');
        pieceDiv.className = 'game-piece';
        pieceDiv.style = `background-color: ${this.player.color}`

        return pieceDiv;
    }
}