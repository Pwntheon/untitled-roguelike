import Glyph from './components/glyph';

export default class Entity {
    constructor(props = {}) {
        ({  name: this.name = '',
            x: this.x = 0,
            y: this.y = 0}
             = props);
        this.components = {};
        let componentList = props.components || [];
        componentList.forEach(component => {
            component.SetEntity(this);
            this.components[component.name] = component;
        });
    }
    
    HasComponent(componentName) {
        return typeof this.components[componentName] !== 'undefined';
    }
}