import * as ROT from 'rot-js';
import Screen from './screen';

export default class PlayScreen extends Screen {
    constructor(config) {
        super(config);
        this.screenName = "Play screen";
    }

    Enter() {
        super.Enter()
    }

    Exit() {
        super.Exit()
    }

    Render(display) {
        display.drawText(3,5, "%c{red}%b{white}This game is so much fun!");
        display.drawText(4,6, "Press [Enter] to win, or [Esc] to lose!");
    }
    
    HandleInput(eventType, event) {
        let keys = ROT.KEYS;
        if(eventType === 'keydown') {
            switch(event.keyCode) {
                case keys.VK_RETURN:
                    this.game.Transition("victory");
                    break;
                case keys.VK_ESCAPE:
                    this.game.Transition("gameover");
                    break;
                default:
                    break;
            }
        }
    }
}