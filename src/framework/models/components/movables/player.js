import Component from '../../component';

export default class PlayerMovable extends Component {
    constructor(props = {}) {
        super({...props, name: "PlayerMovable", interface: "Movable"});
    }

    TryMove(x, y, map) {
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
            this.entity.x = x;
            this.entity.y = y;
            return true;
        }
        if(tile.IsDiggable) {
            map.Dig(x, y);
            return true;
        }
        return false;
    }
}