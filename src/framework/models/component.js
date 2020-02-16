export default class Component {
    constructor(props = {}) {
        ({  name: this.name = ''}
            = props);
        this.entity = null;
    }

    SetEntity(entity) {
        this.entity = entity;
    }
}