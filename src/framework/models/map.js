import Tile from './tile';
import Glyph from './components/glyph';
import {GetNull, GetFloor} from '../factories/tilefactory';

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

    Dig(x, y) {
        if(this.GetTile(x, y).IsDiggable) this.tiles[x][y] = GetFloor();
    }

    GetRandomWalkablePosition() {
        let x, y;
        do {
            x = Math.floor(Math.random() * this.width);
            y = Math.floor(Math.random() * this.height);
        } while (!this.GetTile(x, y).IsWalkable);
        return {x: x, y: y};
    }
}