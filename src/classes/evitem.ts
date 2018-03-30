import { Location } from './location';
import { Photo } from './photo';

export class EVItem {
    id: number;
    name: string;
    address: Location;
    photo?: Photo | {} | null;

    constructor(id: number,
                name: string,
                address: Location,
                photos?: Photo[] | {} | null ) {
        
        this.id = id;
        this.name = name;
        this.address = address;
        this.photo = (this.isEmpty(photos)) ? null : photos[0];
    }

    isEmpty(object: any[] | {}): boolean {
        if (object instanceof Object) {
            if (object instanceof Array) {
                if (object.length === 0) {
                    return true;
                } else {
                    return false;
                }
            } else {
                for(let key in object) {
                    if(object.hasOwnProperty(key))
                        return true;
                }
                return false;
            }
        } else {
            return false;
        }
      }
}