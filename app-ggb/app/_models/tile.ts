export default class Tile {
    title: string;
    free: boolean = false;

    // runtime
    isSelected: boolean = false;

    constructor(title: string, free: boolean = false) {
        this.title = title;
        this.free = free;
    }
    
    public static generateDefaultTile(): Tile {
        return new Tile("Arin does something");
    }
}
