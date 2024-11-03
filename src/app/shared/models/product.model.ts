export interface ProductModel {
    productId: string,
    name: string,
    category: string,
    imageUrl: string,
    colorsAvailable: ColorsAvailable[],
    storageAvailable: StorageAvailable[],
    rating: string,
    price: string,
    promotionText: string,
    description: string,
    isAvailable: boolean
}

interface ColorsAvailable {
    name?: string,
    hexCode?: string
}

interface StorageAvailable {
    size: string
}