export class SearchParams {
    keyword ?: string;
    location ?: string; //1: Near me, 2: Paris, 3: Ile-de-France, 4: Autres
    userInputLocation ?: string;

    constructor(keyword?: string,
                location?: string,
                userInputLocation?:string) {
        this.keyword = (keyword) ? keyword : '';
        this.location = (location) ? location : '';
        this.userInputLocation = (userInputLocation) ? userInputLocation : '';
    }
}
