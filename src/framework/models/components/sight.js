import Component from '../component';

export default class Sight extends Component {
    constructor(props = {}) {
        super({...props, name: 'Sight', interface: 'Sight'});
        this.radius = props.radius || 5;
    }
}