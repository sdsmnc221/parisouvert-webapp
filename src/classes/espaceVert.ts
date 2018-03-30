import { Location } from './location';
import { EVType } from './evtype';
import { Service } from './service';
import { Photo } from './photo';

export class EspaceVert {
    id: number;
    name: string;
    address: Location;
    superficie?: string;
    description?: string;
    type: EVType | {};
    services?: Service[] | {} | null;
    photos?: Photo[] | {} | null;

    constructor(id: number,
                name: string,
                address: Location,
                type: EVType | {},
                superficie?: string,
                description?: string,
                services?: Service[] | {} | null,
                photos?: Photo[] | {} | null) {
        
        this.id = id;
        this.name = name;
        this.address = address;
        this.type = type;
        this.superficie = (superficie) ? superficie : '';
        this.description = (description) ? description : '';
        this.services = (this.isEmpty(services)) ? null : services;
        this.photos = (this.isEmpty(photos)) ? null : photos;
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

