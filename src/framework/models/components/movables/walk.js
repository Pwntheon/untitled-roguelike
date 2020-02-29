import Component from '../../component';

export default class WalkMovable extends Component {
    constructor(props = {}) {
        super({...props, name: "WalkMovable", interface: "Movable"});
    }

    TryMove(x, y) {
        let map = this.entity.map;
        let tile = map.GetTile(x, y)
        let target = map.GetEntityAt(x, y);
        if(target) {
            if(this.entity.HasComponent("Attacker")) {
                this.entity.components.Attacker.Attack(target);
                return true;
            }
            return false;
        };

        if(tile.IsWalkable) {
            this.entity.position = {x, y};
            return true;
        }
        if(tile.IsDiggable) {
            map.Dig(x, y);
            return true;
        }
        return false;
    }
}