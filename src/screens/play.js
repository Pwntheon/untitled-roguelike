import * as ROT from 'rot-js';

import * as Config from '../config.json';

import {GenerateCave} from '../framework/factories/mapgen';
import Screen from './screen';

let clamp = (value, max, min = 0) => Math.max(min, Math.min(max, value));

export default class PlayScreen extends Screen {
    constructor(Config) {
        super(Config);
        this.screenName = "Play screen";
        this.map = null;
        this.camera = {
            x: 10,
            y: 10
        };
    }

    Enter() {
        super.Enter();
        this.map = GenerateCave();
    }

    Exit() {
        super.Exit();
    }

    Render(display) {
        let viewPort = Config.display.playArea;
        let topLeftX = clamp(this.camera.x - viewPort.width/2, this.map.width - viewPort.width, 0);
        let topLeftY = clamp(this.camera.y - viewPort.height/2, this.map.height - viewPort.height, 0);
        for(let x = topLeftX; x < topLeftX + viewPort.width; ++x) {
            for(let y = topLeftY; y < topLeftY + viewPort.height; ++y) {
                let {char, color, bg} = this.map.GetTile(x, y).glyph;
                display.draw(
                    x - topLeftX,
                    y - topLeftY,
                    char,
                    color,
                    bg);
            }

        }
        display.draw(
            this.camera.x - topLeftX,
            this.camera.y - topLeftY,
            '@',
            'white',
            'black');
    }

    Move(dX, dY) {
        this.camera.x = clamp(this.camera.x + dX, this.map.width-1);
        this.camera.y = clamp(this.camera.y + dY, this.map.height-1);
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
                case keys.VK_NUMPAD4:
                case keys.VK_LEFT:
                    this.Move(-1, 0);
                    break;
                case keys.VK_NUMPAD6:
                case keys.VK_RIGHT:
                    this.Move(1, 0);
                    break;
                case keys.VK_NUMPAD8:
                case keys.VK_UP:
                    this.Move(0, -1);
                    break;
                case keys.VK_NUMPAD2:
                case keys.VK_DOWN:
                    this.Move(0, 1);
                    break;
                default:
                    break;
            }
        }
    }
}