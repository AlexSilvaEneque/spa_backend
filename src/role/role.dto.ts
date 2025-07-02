export interface RoleResponseDto {
    id: string
    name: string
    active: boolean
}

export interface RoleRequestDto {
    name: string
    active?: boolean
    permissionIDs?: string[]
}