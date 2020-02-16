import Tile from '../models/tile';

function GetNull() {
    if(!window.objectPool.nullTile) window.objectPool.nullTile = new Tile();
    return window.objectPool.nullTile;
}

function GetWall() {
    if(!window.objectPool.wallTile) window.objectPool.wallTile = new Tile({character: '#', foreground: 'goldenrod', IsDiggable: true});
    return window.objectPool.wallTile;
}

function GetFloor() {
    if(!window.objectPool.floorTile) window.objectPool.floorTile = new Tile({character: '·', foreground: 'darkgray', IsWalkable: true});
    return window.objectPool.floorTile;
}

export {GetNull, GetWall, GetFloor};