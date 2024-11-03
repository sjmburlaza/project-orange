export interface MainGroup {
    groupName?: string,
    group?: SubGroup[]
    isExpanded?: boolean;
}

export interface SubGroup {
    name: string,
    isSelected: boolean
}

export enum Group {
    COLOR = 'color',
    PRICE = 'price',
    CATEGORY = 'category'
}

export enum Price {
    TEN_BELOW = "0 - 10,000",
    TWENTY_BELOW = "10,001 - 20,000",
    THIRTY_BELOW = "20,001 - 30,000",
    FORTY_BELOW = "30,001 - 40,000",
    FIFTY_BELOW = "40,001 - 50,000",
    FIFTY_UP = "50,001 and up"
}