import * as ROT from 'rot-js';

import * as config from '../config.json';
import Screens from '../screens';

export default class game {
    constructor() {
        this.currentScreen = null;
        let screenConfig = {game: this};
        this.screens = {
            "splash": new Screens.Splash(screenConfig),
            "play": new Screens.Play(screenConfig),
            "gameover": new Screens.GameOver(screenConfig),
            "victory": new Screens.Victory(screenConfig)
        };
    }

    Init() {
        this.display = new ROT.Display(config.display.rotConfig);
        document.body.appendChild(this.display.getContainer());

        
        let game = this;
        let bindEvent = (eventType) => {
            window.addEventListener(eventType, (event) => {
                if(game.currentScreen) game.currentScreen.HandleInput(eventType, event);
                game.display.clear();
                game.currentScreen.Render(game.display);
            });
        };
        bindEvent('keydown');
        bindEvent('keyup');
        bindEvent('keypress');

        this.Transition("splash");
    }

    SwitchScreen(newScreen) {
        if(this.currentScreen) this.currentScreen.Exit();
        this.display.clear();
        this.currentScreen = newScreen;
        if(this.currentScreen) {
            this.currentScreen.Enter();
            this.currentScreen.Render(this.display);
        }
    }

    Transition(screenName) {
        this.SwitchScreen(this.screens[screenName]);
    }
}