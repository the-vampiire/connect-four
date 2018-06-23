# Connect Four

### An Object Oriented approach to the Connect Four game. Written in vanilla ES6 JavaScript, HTML, and CSS.

# Class Descriptions
<hr>

# ConnectFour

### Governs over the internal game state and controls the Client and GameAnalyzer objects
### Properties
- `client`: Client object
- `analyzer`: GameAnalyzer object
- `board`: 2-dimensional array of Column and Cell objects representing the game state
- `playerOne`/`playerTwo`: Player objects
- `currentPlayer`: Player object
### Methods
- `constructor()`:
  - defines default Player objects and generates an initial game state
- `start()`:
  - initializes the Client and GameAnalyzer objects. Calls the Client `drawBoard()` method
- `update()`:
  - calls the GameAnalyzer `checkBoard()` method and switches the `currentPlayer` reference
- `reset(()`:
  - iterates over the game state board and calls the Column `emptyCells()` method. calls the Client `drawBoard()` method to redraw the latest game state
- `generateBoard()`:
  - creates 7 Column objects and calls their `populateCells()` method. returns a 2-dimensional array of Column[Cell] objects
- `switchPlayer()`:
  - changes the active player
