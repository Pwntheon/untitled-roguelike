import Component from '../component';

export default class Destructible extends Component {
    constructor(props = {}) {
        super({...props, name: "Destructible", interface: "Destructible"});
        this.maxHp = props.maxHp || 10;
        this.hp = props.hp || this.maxHp;
        this.defense = props.defense || 0;
    }

    TakeDamage(attacker, damage) {
        this.hp -= damage;
        if(this.hp <= 0) {
            this.entity.map.RemoveEntity(this.entity);
            this.entity.game.PostEvent(this.entity, `You die!`);
            this.entity.game.PostEvent(attacker.entity, `You kill the ${this.entity.name}!`);
        }
    }
}
