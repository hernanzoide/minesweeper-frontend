import square from '../img/square.png';
import flag from '../img/flag.png';
import open from '../img/open.png';
import mine from '../img/mine.png';
import mine1 from '../img/1.png';
import mine2 from '../img/2.png';
import mine3 from '../img/3.png';
import mine4 from '../img/4.png';
import mine5 from '../img/5.png';
import mine6 from '../img/6.png';
import mine7 from '../img/7.png';
import mine8 from '../img/8.png';

export class Cell {

    key: number;

    cols: number;
    
    image: string = square;

    constructor(key: number, image: string) {
        this.image = this.getImage(image)
        this.key = key;
        this.cols = 1;
    }
    
    getImage(image: string):any{
        switch (image) {
            case 'flag':
                return flag
            case 'open':
                return open
            case 'mine':
                return mine
            case '1':
                return mine1
            case '2':
                return mine2
            case '3':
                return mine3
            case '4':
                return mine4
            case '5':
                return mine5
            case '6':
                return mine6
            case '7':
                return mine7
            case '8':
                return mine8
            default:
                return square
        }
    }
}