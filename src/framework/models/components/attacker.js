import Component from '../component';

export default class Attacker extends Component {
    constructor(props = {}) {
        super({...props, name: 'Attacker', interface: 'Attacker'});
        this.damage = props.damage || 1;
    }

    Attack(target) {
        if(target.HasComponent("Destructible")) {
            target.components.Destructible.TakeDamage(this, 1);
        }
    }
}