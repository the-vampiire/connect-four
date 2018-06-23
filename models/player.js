class Player {
    constructor(name, color) {
        this.name = name;
        this.color = color;
        this.wins = 0;
    }

    incrementWins() {
        ++this.wins;
    }
}
