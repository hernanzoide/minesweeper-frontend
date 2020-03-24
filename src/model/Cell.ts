import square from '../img/square.png';

export class Cell {

    key: number;

    cols: number;
    
    image: string;

    constructor(key: number, cols: number) {
        this.image = square;
        this.key = key;
        this.cols = cols;
    }
    
}