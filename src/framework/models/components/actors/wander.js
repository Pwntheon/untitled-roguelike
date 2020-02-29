import Component from '../../component';

export default class WanderActor extends Component {
    constructor(props = {}) {
        super({...props, name: 'WanderActor', interface: 'Actor'});
    }

    act() {
        let dX = Math.floor(Math.random() * 3 -1);
        let dY = Math.floor(Math.random() * 3 -1);
        this.entity.components.Movable.TryMove(this.entity.x+dX, this.entity.y+dY);
    }
}