import Tile from './tile';

export default class Gameboard {
    default: boolean = false;
    name: string = "Board";
    tiles: Tile[] = [];

    // runtime
    rows: Tile[][] = [];
    isBingo: boolean = false;

    public static new(gameboard: Gameboard): Gameboard {
        const newGb: Gameboard = Object.assign(new Gameboard(), JSON.parse(JSON.stringify(gameboard)))
        newGb.tiles.forEach(t => t.isSelected = false)
        newGb.rows = []
        newGb.isBingo = false
        return newGb
    }

    public static generateDefaultBoard(): Gameboard {
        let board = new Gameboard();
        board.name = 'Power Hour!';
        //img: 'images/gg_bg.jpg',
        board.tiles = [
            // Arin
            new Tile("Arin puts something in his mouth", true),
            new Tile("Arin wins"),
            new Tile("Arin breaks something"),
            new Tile("Arin drools"),
            new Tile("Arin gets something thrown at him"),

            // Dan
            new Tile("Dan wins"),
            new Tile("Dan ties his hair up"),
            new Tile("Dan leans on arin laughing"),
            new Tile("Dan mentions a band"),
            new Tile("Dan blank stare"),

            // Others
            new Tile("Suzy!"),
            new Tile("Ross!"),
            new Tile("Allie!"),
            new Tile("Reluctant participant"),
            new Tile("Guest grumps"),

            // Situation
            new Tile("Sticky substance on face"),
            new Tile("Belly Reveal"),
            new Tile("Singing together"),
            new Tile("Someone in pain"),
            new Tile("The cheese is mentioned"),
            new Tile("Item not used for inteneded purpose"),
            new Tile("Crew asked a question"),

            // Episodic
            new Tile("Out of the office"),
            new Tile("Versus Episode"),
            new Tile("Table is messed up")
        ];
        return board;
    }

    public doClearSelected() {
        this.tiles.forEach(r => r.isSelected = false);
        (this.rows || []).forEach(row => row.forEach(cell => cell.isSelected = false));
    }

    public doRandomizeRows(isOnlyIfNewBoard?: boolean) {
        // If desired, only randomize if the board has not been randomized yet
        if (isOnlyIfNewBoard && this.rows?.length > 0) {
            return;
        }

        // Ignore tiles with no title
        var availableTiles = this.tiles.filter((el, i) => !!el.title);
    
        // Get normal tiles
        var normalTiles = availableTiles.filter((el, i) => !el.free);

        // Get free tiles
        var freeTiles = availableTiles.filter((el, i) => !!el.free);

        // Verify the board is valid
        if (normalTiles.length < 24) {
            alert('Not enough normal tiles to create a board (required: 24, current: ' + normalTiles.length + ')'); return;
        }
        if (freeTiles.length < 1) {
            alert('No free tiles (required: 1, current: ' + freeTiles.length + ')'); return;
        }

        // Only keep one free tile
        var freeTile = freeTiles.splice(Math.floor(Math.random() * freeTiles.length), 1);

        // Build board
        this.rows = [];
        for (var r = 0; r < 5; r++) {
            let cols: Tile[] = [];
            for (var c = 0; c < 5; c++) {
                var val = undefined;
                if (!!freeTile && r == 2 && c == 2) {
                    // At the center, use a free tile
                    val = freeTile[0];
                } else {
                    // Pop out a random element from the available tiles
                    var valIndex = Math.floor(Math.random() * normalTiles.length);
                    val = normalTiles.splice(valIndex, 1)[0];
                }
                cols[c] = val;
            }
            this.rows[r] = cols;
        }
    }

    public doCheckForBingo() {
        var start = (Date.now());

        var IS_LOGGING = false;
        var log = function (...data: any[]) {
            if (!IS_LOGGING) return;
            console.log.apply(console, data);
        }
        
        var boardSize = this.rows.length;

        var dataBox: boolean[][] = []
        Array(boardSize).fill(0).map((el, y) => {
            dataBox.push(Array(boardSize).fill(0).map((el, x) => this.rows[y][x].isSelected))
        });
        log('dataBox', dataBox);

        /** Checks a single cell for bingo */
        var isCellBingo = function (dataBox: boolean[][], posX: number, posY: number, runX: number, runY: number, checkedCount: number, codeBranch: string) {
            var isBingoData = {
                pos: posX + "," + posY,
                run: runX + "," + runY,
                checkedCount: checkedCount,
                codeBranch: codeBranch,
            }
            log("isBingo", isBingoData);

            var absX = posX + runX;
            var absY = posY + runY;

            var isOutOfBounds = function (x: number, y: number) {
                return (x < 0 || x >= boardSize || y < 0 || y >= boardSize);
            }
            var getCellValue = function (x: number, y: number, rX: number, rY: number) {
                var newAbsX = x + rX;
                var newAbsY = y + rY;
                if (isOutOfBounds(newAbsX, newAbsY)) return false;
                return dataBox[newAbsX][newAbsY];
            }

            // Bingo!
            if (checkedCount == boardSize) return true;

            // Out of bounds
            if (isOutOfBounds(absX, absY)) return false;

            // Cell is not checked
            var cellVal = dataBox[absX][absY];
            if (cellVal !== true) return false;
            
            // Cell is checked
            else {
                // No run started, start run in all 8 surrounding directions
                if (checkedCount == 0) {
                    for (var y = -1; y <= 1; y++) {
                        for (var x = -1; x <= 1; x++) {
                            if (x == 0 && y == 0) continue;
                            var isCellBingoVal = isCellBingo(dataBox, posX, posY, x, y, 2, 'run start ' + [x, y]);
                            if (isCellBingoVal) return true;
                        }
                    }
                }

                // Run already started, continue singlular direction
                else {
                    var newRunX = runX + (runX == 0 ? 0 : runX > 0 ? 1 : -1);
                    var newRunY = runY + (runY == 0 ? 0 : runY > 0 ? 1 : -1);
                    var newCellVal = getCellValue(posX, posY, newRunX, newRunY);
                    if (newCellVal === true) {
                        return isCellBingo(dataBox, posX, posY, newRunX, newRunY, (checkedCount + 1), 'run continue ' + [newRunX, newRunY]);
                    }
                    isBingoData.codeBranch = 'run end ' + [newRunX, newRunY];
                    log("isBingo", isBingoData);
                    return false
                }
            }
        }

        /** Walks the board, checking every cell for bingo */
        function isBoardBingo() {
            for (var y = 0; y < boardSize; y++) {
                for (var x = 0; x < boardSize; x++) {
                    if (isCellBingo(dataBox, x, y, 0, 0, 0, 'walk board')) return true;
                }
            }
            return false;
        }

        // Check the board for a winning condition
        let isWin = isBoardBingo();
        if (isWin) {
            this.isBingo = true;
        }
        log('isBingo: ' + isWin);

        log('time to complete ' + (Date.now() - start));
        return isWin;
    }

    public toSerialized(): string {
        return btoa(JSON.stringify(this));
    }

    public static fromSerialized(serializedData: string): Gameboard {
        return (serializedData ? Object.assign((new Gameboard()), JSON.parse(atob(serializedData))) : undefined);
    }
}
