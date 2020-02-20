import * as LevelGenerators from './levelgen';
import * as Config from '../../config.json';
import {GetWall, GetFloor, GetDownStair, GetUpStair} from './tilefactory';
import {ShuffleArray} from '../../utils/array';

export default class DungeonGenerator {
    constructor(game) {
        this.config = Config.dungeon;
        this.maps = [];
        this.regions = [];
    }
    GetTile(x, y, z) {
        return this.maps[z].GetTile(x, y);
    }

    Generate(game) {
        let z = 0;
        this.config.levels.forEach(l => {
            let currentLevel = new LevelGenerators[l](game, this.config.width, this.config.height);
            this.maps.push(currentLevel);
            this.regions[z] = new Array(currentLevel.width);
            for(let x = 0; x < currentLevel.width; ++x) {
                this.regions[z][x] = new Array(currentLevel.height);
                for(let y = 0; y < currentLevel.height; ++y) {
                    this.regions[z][x][y] = 0;
                }
            }
        });
        for(let z = 0; z < this.config.levels.length; ++z) {
            this.SetupRegions(z);
        }
        this.ConnectAllRegions();
        return this.maps;
    }

    CanFillRegion(x, y, z) {
        const {width, height} = this.config;
        const depth = this.config.levels.length;
        if( x < 0     || y < 0      || z < 0 ||
            x > width || y > height || z > depth) {
            return false;
        }
    
        if(this.regions[z][x][y] !== 0) {
            return false;
        }
    
        return this.GetTile(x, y, z).IsWalkable;    
    }

    FillRegion(regionId, x, y, z) {
        let tilesFilled = 1;
        let tiles = [{x: x, y: y}];
        let tile, neighbors;
        this.regions[z][x][y] = regionId

        while(tiles.length) {
            tile = tiles.pop();
            neighbors = this.maps[z].GetNeighborTiles(x, y);
            while(neighbors.length) {
                tile = neighbors.pop();
                if(this.CanFillRegion(tile.x, tile.y, z)) {
                    this.regions[z][tile.x][tile.y] = regionId;
                    tiles.push(tile);
                    ++tilesFilled;
                }
            }
        }
        return tilesFilled;
    }

    RemoveRegion(regionId, z) {
        for(let x = 0; x < this.config.width; ++x) {
            for(let y = 0; y < this.config.height; ++y) {
                if(this.regions[z][x][y] === regionId) {
                    this.regions[z][x][y] = 0;
                    this.maps[z].tiles[x][y] = GetWall();
                }
            }
        }
    }

    SetupRegions(z) {
        let regionId = 1;
        let filledTiles;
        for(let x = 0; x < this.config.width; ++x) {
            for(let y = 0; y < this.config.height; ++y) {
                if(this.CanFillRegion(x, y, z)) {
                    filledTiles = this.FillRegion(regionId, x, y, z);
                    if(filledTiles < 20) {
                        this.RemoveRegion(regionId, z);
                    } else {
                        ++regionId;
                    }
                }
            }
        }
    }

    FindRegionOverlaps(z, r1, r2) {
        let matches = [];
        for(let x = 0; x < this.config.width; ++x) {
            for(let y = 0; y < this.config.height; ++y) {
                if( this.GetTile(x, y, z)   === GetFloor() &&
                    this.GetTile(x, y, z+1) === GetFloor() &&
                    this.regions[z]  [x][y] === r1 &&
                    this.regions[z+1][x][y] === r2) {
                        matches.push({x: x, y: y});
                    }
            }
        }
        return ShuffleArray(matches);
    }

    ConnectRegions(z, r1, r2) {
        let overlaps = this.FindRegionOverlaps(z, r1, r2);
        if(!overlaps.length) return false;

        let position = overlaps[0];
        this.levels[z].tiles[position.x][position.y] = GetDownStair();
        this.levels[z+1].tiles[position.x][position.y] = GetUpStair();
        return true;
    }

    ConnectAllRegions() {
        for(let z = 0; z < this.config.levels.length-1; ++z) {
            let connected = {};
            let key;
            for(let x = 0; x < this.config.width; ++x) {
                for(let y = 0; y < this.config.height; ++y) {
                    key = this.regions[z][x][y] + ',' + this.regions[z+1][x][y];
                    if( this.GetTile(x, y, z) === GetFloor() &&
                        this.GetTile(x, y, z+1) === GetFloor() &&
                        !connected[key]) {
                        this.ConnectRegions(z, this.regions[z][x][y], this.regions[z+1][x][y]);
                        connected[key] = true;
                    }
                }
            }
        }
    }
}