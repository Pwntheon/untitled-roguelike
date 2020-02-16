import Tile from '../models/tile';

function GetNull() {
    if(!window.objectPool.nullTile) window.objectPool.nullTile = new Tile();
    return window.objectPool.nullTile;
}

function GetWall() {
    if(!window.objectPool.wallTile) window.objectPool.wallTile = new Tile({character: '#', foreground: 'saddlebrown', IsDiggable: true});
    return window.objectPool.wallTile;
}

function GetFloor() {
    if(!window.objectPool.floorTile) window.objectPool.floorTile = new Tile({character: '·', foreground: 'darkslategray', IsWalkable: true});
    return window.objectPool.floorTile;
}

export {GetNull, GetWall, GetFloor};