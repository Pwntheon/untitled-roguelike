
import Tile from './tile';
import Glyph from './glyph';
import {GetNull} from '../factories/tilefactory';

export default class Map {
    constructor(tiles) {
        this._tiles = tiles;
        this._width = tiles.length;
        this._height = tiles[0].length;
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    GetTile(x, y) {
        if(x < 0 || x > this.width || y < 0 || y > this.length) return GetNull();
        return this._tiles[x][y] || GetNull();
    }
}