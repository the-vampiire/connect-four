import ConnectFour from './models/connect_four';

window.addEventListener('load', () => {
    const game = new ConnectFour();
    game.setup();
});
