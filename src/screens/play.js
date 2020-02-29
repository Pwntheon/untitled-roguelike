import * as ROT from 'rot-js';

import * as Config from '../config.json';

import CreateEntity from '../framework/factories/entityfactory';
import DungeonGenerator from '../framework/factories/dungeongen';
import Screen from './screen';
import {GetUpStair, GetDownStair} from '../framework/factories/tilefactory';

let clamp = (value, max, min = 0) => Math.max(min, Math.min(max, value));

export default class PlayScreen extends Screen {
    constructor(Config) {
        super(Config);
        this.screenName = "Play screen";
        this.currentLevel = 0;
        this.player = null;
        this.dungeon = null;
    }

    get map() {
        return this.dungeon[this.currentLevel];
    }

    Ascend() {
        if(this.currentLevel <= 0) {
            this.player.components.EventListener.Post("You cannot go higher. This is the first floor of the dungeon.");
            return false;
        }
        if(this.map.GetTile(this.player.x, this.player.y) !== GetUpStair()) {
            this.player.components.EventListener.Post("There are no stairs leading up here.");
            return false;
        }

        this.map.RemoveEntity(this.player);
        --this.currentLevel;
        this.map.AddEntity(this.player);
        return true;
    }

    Descend() {
        if(this.currentLevel >= this.dungeon.length -1) {
            this.player.components.EventListener.Post("You cannot go deeper.");
            return false;
        }
        if(this.map.GetTile(this.player.x, this.player.y) !== GetDownStair()) {
            this.player.components.EventListener.Post("There are no stairs leading down here.");
            return false;
        }
        
        this.map.RemoveEntity(this.player);
        ++this.currentLevel;
        this.map.AddEntity(this.player);
        return true;
    }

    Enter() {
        super.Enter();
        this.player = CreateEntity(this.game, "Player", 0, 0);
        this.dungeon = new DungeonGenerator(this.game).Generate(this.game);
        this.map.AddEntityAtRandomPosition(this.player);
    }

    Exit() {
        super.Exit();
    }

    Render(display) {
        console.log("Render");
        let viewPort = Config.display.playArea;
        let topLeftX = clamp(this.player.x - viewPort.width/2, this.map.width - viewPort.width, 0);
        let topLeftY = clamp(this.player.y - viewPort.height/2, this.map.height - viewPort.height, 0);
        let visibleCells = {};
        this.map.fov.compute(this.player.x, this.player.y, this.player.components.Sight.radius,
            (x, y, radius, visibility) => {
                visibleCells[`${x},${y}`] = true;
            });
        for(let x = topLeftX; x < topLeftX + viewPort.width; ++x) {
            for(let y = topLeftY; y < topLeftY + viewPort.height; ++y) {
                let inFov = !!visibleCells[`${x},${y}`];
                let seen = !!this.map.seen[`${x},${y}`]
                if(!inFov && !seen) continue;

                let {character, foreground, background} = this.map.GetTile(x, y);
                if(!inFov) foreground = 'darkslategray';
                this.map.seen[`${x},${y}`] = true;
                display.draw(
                    x - topLeftX,
                    y - topLeftY,
                    character,
                    foreground,
                    background);
            }

        }

        for(let key in this.map.entities) {
            let e = this.map.entities[key];
            if( e.x >= topLeftX && e.x < topLeftX + viewPort.width &&
                e.y >= topLeftY && e.y < topLeftY + viewPort.height) {
                if(!visibleCells[`${e.x},${e.y}`]) continue;
                
                display.draw(
                    e.x - topLeftX,
                    e.y - topLeftY,
                    e.components.Glyph.character,
                    e.components.Glyph.foreground,
                    e.components.Glyph.background);
            }
        }

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
        return this.player.components.Movable.TryMove(x, y, this.map);
    }
    
    HandleInput(eventType, event) {
        let keys = ROT.KEYS;
        let didAct = false;
        let emptyInput = false;

        if(eventType === 'keyup') {
            switch(event.keyCode) {
                default:
                    emptyInput = true;
                    break;
            }
        }
        if(eventType === 'keypress') {
            switch(String.fromCharCode(event.charCode)) {
                case '>':
                    didAct = this.Descend();
                    break;
                case '<':
                    didAct = this.Ascend();
                    break;
                default:
                    emptyInput = true;
                    break;
            }
        }
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
                    didAct = this.Move(-1, 0);
                    break;
                case keys.VK_NUMPAD6:
                case keys.VK_RIGHT:
                    didAct = this.Move(1, 0);
                    break;
                case keys.VK_NUMPAD8:
                case keys.VK_UP:
                    didAct = this.Move(0, -1);
                    break;
                case keys.VK_NUMPAD2:
                case keys.VK_DOWN:
                    didAct = this.Move(0, 1);
                    break;
                case keys.VK_NUMPAD7:
                    didAct = this.Move(-1, -1);
                    break;
                case keys.VK_NUMPAD1:
                    didAct = this.Move(-1, 1);
                    break;
                case keys.VK_NUMPAD3:
                    didAct = this.Move(1, 1);
                    break;
                case keys.VK_NUMPAD9:
                    didAct = this.Move(1, -1);
                    break;
                default:
                    emptyInput = true;
                    break;
            }
        }
        if(didAct) this.game.UnlockCurrentEngine();
        else if(!emptyInput) this.game.Render();
    }
}