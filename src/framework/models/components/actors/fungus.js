import CreateEntity from '../../../factories/entityfactory';
import Component from '../../component';

export default class FungusActor extends Component {
    constructor(props = {}) {
        super({...props, name: "FungusActor", interface: "Actor"});
        this.growthsRemaining = props.growths || 10;
        this.growChance = props.growChance = 0.25;
    }

    act() {
        // Note that even if we can't grow somewhere, we spend our growth.
        // This is an easy way to ensure we don't keep checking forever
        // if we are walled in.
        if(this.growthsRemaining > 0) {
            if(Math.random() <= this.growChance) {
                --this.growthsRemaining; 
                let x = this.entity.x + Math.floor(Math.random() * 3) -1;
                let y = this.entity.y + Math.floor(Math.random() * 3) -1;
                if(this.entity.map.IsWalkable(x, y)) {
                    let newFungus = CreateEntity(this.entity.game, "Fungus", x, y);
                    newFungus.components.FungusActor.growthsRemaining = this.growthsRemaining / 2;
                    this.growthsRemaining = this.growthsRemaining / 2;
                    this.entity.map.AddEntity(newFungus);
                    this.entity.game.PostEventToNearbyEntities(this.entity.map, this.entity.x, this.entity.y, `The ${this.entity.name} is spreading!`);
                }
            }
        }
    }
}