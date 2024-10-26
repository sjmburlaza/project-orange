export interface ProductModel {
    productId: string,
    name: string,
    group: string,
    imageUrl: string,
    colorsAvailable: ColorsAvailable[],
    rating: string,
    price: string,
    promotionText: string,
    description: string,
    isAvailable: boolean
}

interface ColorsAvailable {
    name: string,
    hexCode: string
}