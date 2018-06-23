// const getPlayerData = () => {
//     // selects the User input fields and maps them to collect their values
//     const values = Array.from(document.querySelectorAll(
//         '#playerOneName, #playerOneColor, #playerTwoName, #playerTwoColor'
//     ), element => element.value);

//     return {
//         playerOneData: { name: values[0], color: values[1] },
//         playerTwoData: { name: values[2], color: values[3] }
//     };
// }

// const createPlayers = () => {
//     const { playerOneData, playerTwoData } = getPlayerData();

//     return {
//         playerOne: new Player(playerOneData.name, playerOneData.color),
//         playerTwo: new Player(playerTwoData.name, playerTwoData.color),
//     };
// }

window.addEventListener('load', () => {
    // const { playerOne, playerTwo } = createPlayers();
    // const game = new ConnectFour(playerOne, playerTwo);
    const game = new ConnectFour();
    game.start();
});
