import * as ROT from 'rot-js';
import Screen from './screen';

export default class SplashScreen extends Screen {
    constructor(config) {
        super(config);
        this.screenName = "Splash screen";
    }

    Enter() {
        super.Enter()
    }

    Exit() {
        super.Exit()
    }

    Render(display) {
        display.drawText(1,1, "%c{yellow}Javascript Roguelike");
        display.drawText(1,2, "Press [Enter] to start!");
    }
    
    HandleInput(eventType, event) {
        let keys = ROT.KEYS;
        if(eventType === 'keydown') {
            if(event.keyCode === keys.VK_RETURN) this.game.Transition("play");
        }
    }
}