import Glyph from './components/glyph';

export default class Item {
    constructor(props = {}) {
        ({
            name: this.name = "Unidentified item"
        } = props);
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

    GetComponent(interfaceName) {
        return this.components[interfaceName];
    }
    
    HasComponent(interfaceName) {
        return typeof this.components[interfaceName] !== 'undefined';
    }
}