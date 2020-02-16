
import Tile from './tile';
import Glyph from './glyph';
import {GetNull} from '../factories/tilefactory';

export default class Map {
    constructor(tiles) {
        this.tiles = tiles;
        this.width = tiles.length;
        this.height = tiles[0].length;
    }

    GetTile(x, y) {
        if(x < 0 || x > this.width || y < 0 || y > this.length) return GetNull();
        return this.tiles[x][y] || GetNull();
    }
}