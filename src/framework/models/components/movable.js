import Component from '../component';

export default class Movable extends Component {
    constructor(props) {
        super({...props, name: "Movable"});
    }

    TryMove(x, y, map) {
        let tile = map.GetTile(x, y)
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