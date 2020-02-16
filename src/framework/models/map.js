import Tile from './tile';
import Glyph from './components/glyph';
import {GetNull, GetFloor} from '../factories/tilefactory';
import CreateEntity from '../factories/entityfactory';
import * as ROT from 'rot-js';

export default class Map {
    constructor(game, tiles, player) {
        this.tiles = tiles;
        this.width = tiles.length;
        this.height = tiles[0].length;
        this.game = game;

        this.entities = [];
        this.scheduler = new ROT.Scheduler.Simple();
        this.engine = new ROT.Engine(this.scheduler);

        for(let i = 0; i < 100; i++) {
            let newFungus = CreateEntity(this.game, "Fungus", 0, 0);
            this.AddEntityAtRandomPosition(newFungus);
        }
    }

    AddEntity(entity) {
        if( entity.x < 0 || entity.x > this.width ||
            entity.y < 0 || entity.y > this.height)
            throw new Error('Attempted to add enitity out of bounds: ', entity);

        entity.SetMap(this);
        this.entities.push(entity);
        if(entity.HasComponent("Actor")) this.scheduler.add(entity, true);
    }

    RemoveEntity(entity) {
        let index = this.entities.findIndex(e => e === entity);
        this.entities.splice(index, 1);
        if(entity.HasComponent("Actor")) this.scheduler.remove(entity);
    }

    AddEntityAtRandomPosition(entity) {
        let position = this.GetRandomWalkablePosition();
        entity.x = position.x;
        entity.y = position.y;
        this.AddEntity(entity);
    }

    GetEntityAt(x, y) {
        return this.entities.find(e => e.x === x && e.y === y) || false;
    }

    GetTile(x, y) {
        if(x < 0 || x > this.width || y < 0 || y > this.length) return GetNull();
        return this.tiles[x][y] || GetNull();
    }

    Dig(x, y) {
        if(this.GetTile(x, y).IsDiggable) this.tiles[x][y] = GetFloor();
    }

    IsWalkable(x, y) {
        return this.GetTile(x, y).IsWalkable && !this.GetEntityAt(x, y);
    }

    GetRandomWalkablePosition() {
        let x, y;
        do {
            x = Math.floor(Math.random() * this.width);
            y = Math.floor(Math.random() * this.height);
        } while (!this.IsWalkable(x, y));
        return {x: x, y: y};
    }
}