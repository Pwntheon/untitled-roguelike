import Glyph from './components/glyph';

export default class Tile {
    constructor(props = {}) {
        this.glyph = new Glyph(props);
        Object.assign(this, this.glyph);
        ({  IsWalkable: this.IsWalkable = false,
            IsDiggable: this.IsDiggable = false,
            BlocksLight: this.BlocksLight = false}
            = props);

        this.seen = false;
    }
}