import Tile from '../models/tile';

function GetNull() {
    if(!window.objectPool.nullTile) window.objectPool.nullTile = new Tile();
    return window.objectPool.nullTile;
}

function GetWall() {
    if(!window.objectPool.wallTile) window.objectPool.wallTile = new Tile({character: '#', foreground: 'saddlebrown', IsDiggable: true, BlocksLight: true});
    return window.objectPool.wallTile;
}

function GetFloor() {
    if(!window.objectPool.floorTile) window.objectPool.floorTile = new Tile({character: '·', foreground: 'darkslategray', IsWalkable: true});
    return window.objectPool.floorTile;
}

function GetUpStair() {
    if(!window.objectPool.upStairTile) window.objectPool.upStairTile = new Tile({character: '<', foreground: 'white', IsWalkable: true});
    return window.objectPool.upStairTile;
}

function GetDownStair() {
    if(!window.objectPool.downStairTile) window.objectPool.downStairTile = new Tile({character: '>', foreground: 'white', IsWalkable: true});
    return window.objectPool.downStairTile;
}

export {GetNull, GetWall, GetFloor, GetUpStair, GetDownStair};