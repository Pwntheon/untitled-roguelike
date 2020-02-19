import Component from '../component';

export default class Attacker extends Component {
    constructor(props = {}) {
        super({...props, name: 'Attacker', interface: 'Attacker'});
        this.attack = props.attack || 1;
    }

    Attack(target) {
        if(target.HasComponent("Destructible")) {
            let defense = target.components.Destructible.defense;
            let maxDamage = Math.max(0, this.attack - defense);
            let damage = 1 + Math.floor(Math.random() * maxDamage);
            this.entity.game.PostEvent(this.entity, `You strike the ${target.name} for ${damage} damage!`);
            this.entity.game.PostEvent(target, `The ${this.entity.name} strikes you for ${damage} damage!`);
            target.components.Destructible.TakeDamage(this, damage);
        }
    }
}