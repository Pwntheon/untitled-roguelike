import Component from '../component';

export default class Glyph extends Component{
    constructor(props = {}) {
        super({...props, name: 'Glyph'});
        let {character = '', foreground = 'white', background = 'black'} = props;
        this.character = character;
        this.foreground = foreground;
        this.background = background;
    }
}