import * as ROT from 'rot-js';

import * as Config from '../config.json';

import CreateEntity from '../framework/factories/entityfactory';
import {GenerateCave} from '../framework/factories/mapgen';
import Screen from './screen';

let clamp = (value, max, min = 0) => Math.max(min, Math.min(max, value));

export default class PlayScreen extends Screen {
    constructor(Config) {
        super(Config);
        this.screenName = "Play screen";
        this.map = null;
        this.player = null;
    }

    Enter() {
        super.Enter();
        this.map = GenerateCave();
        let spawnPosition = this.map.GetRandomWalkablePosition();
        this.player = CreateEntity("Player", spawnPosition.x, spawnPosition.y);
    }

    Exit() {
        super.Exit();
    }

    Render(display) {
        let viewPort = Config.display.playArea;
        let topLeftX = clamp(this.player.x - viewPort.width/2, this.map.width - viewPort.width, 0);
        let topLeftY = clamp(this.player.y - viewPort.height/2, this.map.height - viewPort.height, 0);
        for(let x = topLeftX; x < topLeftX + viewPort.width; ++x) {
            for(let y = topLeftY; y < topLeftY + viewPort.height; ++y) {
                let {character, foreground, background} = this.map.GetTile(x, y);
                display.draw(
                    x - topLeftX,
                    y - topLeftY,
                    character,
                    foreground,
                    background);
            }

        }
        let glyph = this.player.components.Glyph;
        display.draw(
            this.player.x - topLeftX,
            this.player.y - topLeftY,
            glyph.character,
            glyph.foreground,
            glyph.background);
    }

    Move(dX, dY) {
        let x = this.player.x + dX;
        let y = this.player.y + dY;
        this.player.components.Movable.TryMove(x, y, this.map);
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
                case keys.VK_NUMPAD7:
                    this.Move(-1, -1);
                    break;
                case keys.VK_NUMPAD1:
                    this.Move(-1, 1);
                    break;
                case keys.VK_NUMPAD3:
                    this.Move(1, 1);
                    break;
                case keys.VK_NUMPAD9:
                    this.Move(1, -1);
                    break;
                default:
                    break;
            }
        }
    }
}