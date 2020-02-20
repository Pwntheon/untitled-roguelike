import * as ROT from 'rot-js';

import * as Config from '../config.json';

import CreateEntity from '../framework/factories/entityfactory';
import DungeonGenerator from '../framework/factories/dungeongen';
import Screen from './screen';
import Entity from '../framework/models/entity.js';

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
        this.player = CreateEntity(this.game, "Player", 0, 0);
        const gen = new DungeonGenerator(this.game);
        this.map = gen.Generate(this.game)[0];
        this.map.AddEntityAtRandomPosition(this.player);
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

        this.map.entities.forEach(e => {
            
            if( e.x >= topLeftX && e.x < topLeftX + viewPort.width &&
                e.y >= topLeftY && e.y < topLeftY + viewPort.height) {
                    display.draw(
                        e.x - topLeftX,
                        e.y - topLeftY,
                        e.components.Glyph.character,
                        e.components.Glyph.foreground,
                        e.components.Glyph.background);
                }
        });

        let textPosition = {x: 0, y: viewPort.height};
        let {hp, maxHp} = this.player.components.Destructible;
        const hpColor = hp > maxHp/2 ? "%c{green}%b{black}" : "%c{red}%b{black}";
        textPosition.y += display.drawText( textPosition.x,
                                            textPosition.y,
                                            `Hp: ${hpColor + hp}%c{white}%b{black}/${maxHp}`);

        
        this.player.components.EventListener.events.forEach(e => {
            textPosition.y += display.drawText( textPosition.x,
                                                textPosition.y,
                                                e,
                                                Config.display.rotConfig.width);
        });
    }

    Move(dX, dY) {
        let x = this.player.x + dX;
        let y = this.player.y + dY;
        this.player.components.Movable.TryMove(x, y, this.map);
    }
    
    HandleInput(eventType, event) {
        let keys = ROT.KEYS;
        let didAct = false;
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
                    didAct = true;
                    break;
                case keys.VK_NUMPAD6:
                case keys.VK_RIGHT:
                    this.Move(1, 0);
                    didAct = true;
                    break;
                case keys.VK_NUMPAD8:
                case keys.VK_UP:
                    this.Move(0, -1);
                    didAct = true;
                    break;
                case keys.VK_NUMPAD2:
                case keys.VK_DOWN:
                    this.Move(0, 1);
                    didAct = true;
                    break;
                case keys.VK_NUMPAD7:
                    this.Move(-1, -1);
                    didAct = true;
                    break;
                case keys.VK_NUMPAD1:
                    this.Move(-1, 1);
                    didAct = true;
                    break;
                case keys.VK_NUMPAD3:
                    this.Move(1, 1);
                    didAct = true;
                    break;
                case keys.VK_NUMPAD9:
                    this.Move(1, -1);
                    didAct = true;
                    break;
                default:
                    break;
            }
        }
        if(didAct) this.game.UnlockCurrentEngine();
    }
}