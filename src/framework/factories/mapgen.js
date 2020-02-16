import * as ROT from 'rot-js';
import * as Config from '../../config.json';

import {GetNull, GetFloor, GetWall} from './tilefactory';
import Map from '../models/map';


function GenerateCave(game) {
    let config = Config.mapGenerators.caves;
    const map = GenerateBlankMap(config.width, config.height);

    const generator = new ROT.Map.Cellular(config.width, config.height);
    generator.randomize(config.fill);

    // Generate n-1 times - last time we need to fetch the results
    for(let i = 0; i < config.iterations -1; ++i) generator.create();
    generator.create((x, y, v) => {
        if(v === 1) map[x][y] = GetFloor();
        else map[x][y] = GetWall();
    });

    return new Map(game, map);
}

function GenerateBlankMap(width, height) {
    const map = [];
    for (let x = 0; x < width; x++) {
        // Create the nested array for the y values
        map.push([]);
        // Add all the tiles
        for (let y = 0; y < height; y++) {
            map[x].push(GetNull());
        }
    }
    return map;
}

export {GenerateCave};