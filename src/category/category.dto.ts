export interface CategoryResponseDto {
    id: string
    name: string
    active: boolean
    createdAt: Date
}

export interface CategoryRequestDto {
    name: string,
    active: boolean
}