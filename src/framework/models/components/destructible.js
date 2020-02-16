import Component from '../component';

export default class Destructible extends Component {
    constructor(props = {}) {
        super({...props, name: "Destructible", interface: "Destructible"});
        this.hp = props.hp || 1;
    }

    TakeDamage(attacker, damage) {
        this.hp -= damage;
        if(this.hp <= 0) this.entity.map.RemoveEntity(this.entity);
    }
}
