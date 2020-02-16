export default class Component {
    constructor(props = {}) {
        ({  name: this.name = '', interface: this.interface = ''}
            = props);
        this.entity = null;
    }

    SetEntity(entity) {
        this.entity = entity;
    }
}