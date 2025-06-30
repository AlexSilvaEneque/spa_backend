export interface ServiceResponseDto {
    id: string
    name: string
    active: boolean
    price: number,
    category?: {
        name: string
    }
}

export interface ServiceRequestDto {
    name: string
    active?: boolean
    price: number
    categoryId: string
}