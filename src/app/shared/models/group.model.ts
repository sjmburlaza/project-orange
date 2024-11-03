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