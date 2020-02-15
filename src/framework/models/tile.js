export default class Tile {
    constructor(glyph) {
        if(!glyph) throw new Error("Attempted to create Tile with no Glyph");
        this._glyph = glyph;
    }

    get glyph() {
        return this._glyph;
    }
}