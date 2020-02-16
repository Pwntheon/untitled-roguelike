export default class Glyph {
    constructor(props = {}) {
        let {character = '', foreground = 'white', background = 'black'} = props;
        this.character = character;
        this.foreground = foreground;
        this.background = background;
    }
}