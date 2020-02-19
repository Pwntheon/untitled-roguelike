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
            });
        };
        bindEvent('keydown');
        bindEvent('keyup');
        bindEvent('keypress');

        this.Transition("splash");
    }

    PostEventToNearbyEntities(map, x, y, event, radius = 5) {
        map.GetEntitiesWithinRadius(x, y, radius).forEach(e => this.PostEvent(e, event));
    }

    PostEvent(target, event) {
        if(target.HasComponent("EventListener")) {
            target.components.EventListener.Post(event);
        }
    }

    Render() {
        this.display.clear();
        this.currentScreen.Render(this.display);
    }

    LockCurrentEngine() {
        try {
            this.currentScreen.map.engine.lock();
            return true;
        } catch (e) {
            console.log("Tried to lock engine but failed: " + e);
            return false;
        }
    }

    UnlockCurrentEngine() {
        try {
            this.currentScreen.map.engine.unlock();
            return true;
        } catch (e) {
            console.log("Tried to unlock engine but failed: " + e);
            return false;
        }
    }

    SwitchScreen(newScreen) {
        if(this.currentScreen) this.currentScreen.Exit();
        this.currentScreen = newScreen;
        if(this.currentScreen) {
            this.currentScreen.Enter();
            this.Render();
        }
    }

    Transition(screenName) {
        this.SwitchScreen(this.screens[screenName]);
    }
}