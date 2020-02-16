import Component from '../../component';

export default class FungusActor extends Component {
    constructor(props = {}) {
        super({...props, name: "FungusActor", interface: "Actor"});
    }

    act() {
    }
}