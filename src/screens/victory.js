import * as ROT from 'rot-js';
import Screen from './screen';

export default class VictoryScreen extends Screen {
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
            // Generate random background colors
            let r = Math.round(Math.random() * 255);
            let g = Math.round(Math.random() * 255);
            let b = Math.round(Math.random() * 255);
            let background = ROT.Color.toRGB([r, g, b]);
            display.drawText(2, i + 1, "%b{" + background + "}You win!");
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