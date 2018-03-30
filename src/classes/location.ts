export class Location {
    address: string;
    postalCode: number;
    city: string;
    long: number;
    lat: number;

    constructor(address: string, 
                postalCode: number,
                city: string) {
        
        this.address = address;
        this.postalCode = postalCode;
        this.city = city;
        
    }
}