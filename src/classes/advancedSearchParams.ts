export class AdvancedSearchParams {
    orderBy : any;
    filterBy : any;
    filterStrictMode : boolean; 
    keyword ?: string;
    userInputLocation ?: string;

    constructor(orderBy ?: Object,
                filterBy ?: Object,
                filterStrictMode ?: boolean,
                keyword ?: string,
                userInputLocation ?: string) {
        const defaultParams: any = {
            orderBy: {
                pertinence: true,
                az: true,
                popularity: false,
                superficie: 0
            },
            filterBy: {
                distance: 0,
                disponibility: 0,
                types: [0],
                services: [0]
            }
        };
        this.orderBy = (orderBy) ? orderBy : defaultParams.orderBy;
        this.filterBy = (filterBy) ? filterBy : defaultParams.filterBy;
        this.filterStrictMode = (filterStrictMode) ? filterStrictMode : false;
        this.keyword = (keyword) ? keyword : '';
        this.userInputLocation = (userInputLocation) ? userInputLocation : '';
    }
}
