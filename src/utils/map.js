
function LogTilesArray(tiles) {
    let line = "";
    for(let x = 0; x < tiles.length; ++x) {
        for(let y = 0; y < tiles[x].length; ++y) {
            line += tiles[x][y].glyph.character;
        }
        console.log(line);
        line = "";
    }
}

export {LogTilesArray};