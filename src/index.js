import Game from './framework/game';

document.addEventListener("DOMContentLoaded", function() {
    window.objectPool = {};
    const game = new Game();
    game.Init();
 });