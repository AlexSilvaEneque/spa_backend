import { RoleRequestDto, RoleResponseDto } from './role.dto'
import prisma from '../shared/prisma'
import { NotFoundError } from '../shared/errors/NotFoundError'
import { ValidationError } from '../shared/errors/ValidationError'

export const getRoles = async () : Promise<RoleResponseDto[]> => {
    return prisma.role.findMany({
        select: {
            id: true,
            name: true,
            active: true
        }
    })
}

export const roleById = async (id: string) : Promise<RoleResponseDto> => {
    const role = await prisma.role.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            active: true,
            permissions: {
                select: {
                    name: true,
                }
            }
        }
    })

    if (!role) {
        throw new NotFoundError(`Role with ID ${id} not found`)
    }

    return role
}

export const storeRole = async (data: RoleRequestDto) : Promise<void> => {
    const { name, active, permissionIDs } = data

    if (!name || typeof name !== 'string') {
        throw new ValidationError('El campo nombre es obligatorio y debe ser una cadena de texto.')
    }

    await prisma.role.create({
        data: {
            name,
            active: active ?? true,
            ...(permissionIDs && Array.isArray(permissionIDs) && permissionIDs.length
                ? {permissionIDs}
                : {}
            )
        }
    })

}

export const updateDataRoles = async (id: string, data: RoleRequestDto) : Promise<void> => {
    const { name, active, permissionIDs } = data

    if (!name || typeof name !== 'string') {
        throw new ValidationError('El campo nombre es obligatorio y debe ser una cadena de texto.')
    }

    await roleById(id)

    await prisma.role.update({
        where: { id },
        data: {
            name,
            active: active ?? true,
            ...(permissionIDs && Array.isArray(permissionIDs) && permissionIDs.length
                ? {permissionIDs}
                : {}
            )
        }
    })
}

export const deleteDataRole = async (id: string) : Promise<void> => {
    await roleById(id)

    await prisma.role.update({
        where: { id },
        data: {
            active: false
        }
    })
}