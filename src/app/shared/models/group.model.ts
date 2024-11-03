export interface MainGroup {
    groupName?: string,
    group?: SubGroup[]
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