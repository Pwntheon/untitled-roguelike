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
        for (var i = 0; i < 22; i++) {
            // Generate random background colors
            var r = Math.round(Math.random() * 255);
            var g = Math.round(Math.random() * 255);
            var b = Math.round(Math.random() * 255);
            var background = ROT.Color.toRGB([r, g, b]);
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