import { CategoryRequestDto, CategoryResponseDto } from "./category.dto"
import { NotFoundError } from "../shared/errors/NotFoundError"
import { ValidationError } from "../shared/errors/ValidationError"
import prisma from "../shared/prisma"

export const allCategories = async () : Promise<CategoryResponseDto[]> => {
    return prisma.category.findMany({
        select: {
            id: true,
            name: true,
            active: true,
            createdAt: true
        }
    })
}

export const categoryById = async (id: string) : Promise<CategoryResponseDto> => {
    const category = await prisma.category.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            active: true,
            createdAt: true,
            updatedAt: true
        }
    })

    if (!category) {
        throw new NotFoundError(`Category with ID ${id} not found`)
    }

    return category
}

export const storeCategory = async (data: CategoryRequestDto) : Promise<void> => {
    const { name, active } = data

    if (!name || typeof name !== 'string') {
        throw new ValidationError('El cmapo nombre es obligatorio y debe ser una cadena de texto.')
    }

    if (typeof active !== 'boolean') {
        throw new ValidationError('El campo activo es obligatorio.')
    }

    await prisma.category.create({
        data: {
            name,
            active
        }
    })
}

export const updateDataCategory = async (id: string, data: CategoryRequestDto) : Promise<void> => {
    const { name, active } = data

    if (!name || typeof name !== 'string') {
        throw new ValidationError('El campo nombre es obligatorio y debe ser una cadena de texto.')
    }

    if (typeof active !== 'boolean') {
        throw new ValidationError('El campo activo es obligatorio')
    }

    await categoryById(id)

    await prisma.category.update({
        where: { id },
        data: {
            name,
            active
        }
    })
}

export const deleteDataCategory = async (id: string) : Promise<void> => {
    await categoryById(id)

    await prisma.category.update({
        where: { id },
        data: {
            active: false
        }
    })
}