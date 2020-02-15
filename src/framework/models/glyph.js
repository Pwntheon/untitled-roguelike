export default class Glyph {
    constructor({character = '', foreground = 'white', background = 'black'} = {}) {
        this.character = character;
        this.foreground = foreground;
        this.background = background;
    }

    get char() {
        return this.character;
    }

    get color() {
        return this.foreground;
    }

    get bg() {
        return this.background;
    }
}