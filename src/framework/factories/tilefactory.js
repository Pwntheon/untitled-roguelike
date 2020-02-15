import Tile from '../models/tile';
import Glyph from '../models/glyph';

function GetNull() {
    if(!window.objectPool.nullTile) window.objectPool.nullTile = new Tile(new Glyph());
    return window.objectPool.nullTile;
}

function GetWall() {
    if(!window.objectPool.wallTile) window.objectPool.wallTile = new Tile(new Glyph({character: '#', foreground: 'goldenrod'}));
    return window.objectPool.wallTile;
}

function GetFloor() {
    if(!window.objectPool.floorTile) window.objectPool.floorTile = new Tile(new Glyph({character: '.', foreground: 'darkgray'}));
    return window.objectPool.floorTile;
}

export {GetNull, GetWall, GetFloor};