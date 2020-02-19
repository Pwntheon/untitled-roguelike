import Component from '../component';

export default class EventListener extends Component {
    constructor(props = {}) {
        super({...props, name: 'EventListener', interface: 'EventListener'});
        this.events = [];
    }
    Post(event) {
        this.events.push(event);
    }
    Clear() {
        this.events = [];
    }
}