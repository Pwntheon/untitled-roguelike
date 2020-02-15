import * as ROT from 'rot-js';
import Screen from './screen';

export default class GameOverScreen extends Screen {
    constructor(config) {
        super(config);
        this.screenName = "Victory screen";
    }

    Enter() {
        super.Enter()
    }

    Exit() {
        super.Exit()
    }

    Render(display) {
        for (let i = 0; i < 22; i++) {
            display.drawText(2, i + 1, "%b{red}You lose! :(");
        }
    }
    
    HandleInput(eventType, event) {
        let keys = ROT.KEYS;
        if(eventType === 'keydown') {
            switch(event.keyCode) {
                default:
                    this.game.Transition("splash");
                    break;
            }
        }
    }
}