import Glyph from './components/glyph';

export default class Entity {
    constructor(game, props = {}) {
        ({  name: this.name = '',
            x: this.x = 0,
            y: this.y = 0}
            = props);
        this.game = game;
        this.map = null;
        this.components = {};
        let componentList = props.components || [];
        componentList.forEach(component => {
            component.SetEntity(this);
            this.components[component.interface] = component;
            if(component.name !== component.interface) {
                this.components[component.name] = component;
            }
        });
    }

    get position() {
        return {x: this.x, y: this.y};
    }

    set position(pos) {
        let oldPos = this.position;
        ({x: this.x, y: this.y} = pos);
        this.map.UpdateEntityPosition(this, oldPos.x, oldPos.y);
    }

    act() {
        if(this.HasComponent("Actor")) {
            this.components.Actor.act();
        }
    }

    SetMap(map) {
        this.map = map;
    }

    GetComponent(interfaceName) {
        return this.components[interfaceName];
    }
    
    HasComponent(interfaceName) {
        return typeof this.components[interfaceName] !== 'undefined';
    }
}