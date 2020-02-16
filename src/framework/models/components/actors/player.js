import Component from '../../component';

export default class PlayerActor extends Component {
    constructor(props = {}) {
        super({...props, name: "PlayerActor", interface: "Actor"});
    }

    act() {
        let game = this.entity.game;
        game.Render();
        game.LockCurrentEngine();
    }
}