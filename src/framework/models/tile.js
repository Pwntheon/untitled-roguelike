import Glyph from './glyph';

export default class Tile {
    constructor(props = {}) {
        this.glyph = new Glyph(props);
        Object.assign(this, this.glyph);
    }
}