import * as ROT from 'rot-js';

import {GetNull, GetFloor} from '../factories/tilefactory';
import CreateEntity from '../factories/entityfactory';
import {ShuffleArray} from '../../utils/array';


export default class Map {
    constructor(game, tiles) {
        this.tiles = tiles;
        this.width = tiles.length;
        this.height = tiles[0].length;
        this.game = game;
        this.seen = {};

        this.entities = [];
        this.scheduler = new ROT.Scheduler.Simple();
        this.engine = new ROT.Engine(this.scheduler);
        let map = this;
        this.fov = new ROT.FOV.DiscreteShadowcasting(function(x, y) {
            return !map.GetTile(x, y).BlocksLight;
        }); //, {topology: 8});

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

    GetEntitiesWithinRadius(x, y, radius) {
        let xMin = x - radius;
        let xMax = x + radius;
        let yMin = y - radius;
        let yMax = y + radius;
        return this.entities.filter(e => e.x >= xMin && e.x <= xMax && e.y >= yMin && e.y <= yMax);
    }

    GetNeighborTiles(x, y) {
        let tiles = [];
        for (var dX = -1; dX < 2; dX ++) {
            for (var dY = -1; dY < 2; dY++) {
                // Make sure it isn't the same tile
                if (dX == 0 && dY == 0) {
                    continue;
                }
                tiles.push({x: x + dX, y: y + dY});
            }
        }
        return ShuffleArray(tiles);
    }

    Dig(x, y) {
        if(this.GetTile(x, y).IsDiggable) this.tiles[x][y] = GetFloor();
    }

    IsWalkable(x, y) {
        return this.GetTile(x, y).IsWalkable && !this.GetEntityAt(x, y);
    }

    GetRandomWalkablePosition() {
        let x, y;
        let iterations = 0;
        do {
            x = Math.floor(Math.random() * this.width);
            y = Math.floor(Math.random() * this.height);
            if(iterations++ > 10000) throw new Error("Couldn't find walkable position in map" + this);
        } while (!this.IsWalkable(x, y));
        return {x: x, y: y};
    }
}