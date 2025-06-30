import { NotFoundError } from "../shared/errors/NotFoundError"
import { ValidationError } from "../shared/errors/ValidationError"
import prisma from "../shared/prisma"
import { ServiceRequestDto, ServiceResponseDto } from "./service.dto"

export const allServices = async () : Promise<ServiceResponseDto[]> => {
    return prisma.service.findMany({
        select: {
            id: true,
            name: true,
            active: true,
            price: true
        }
    })
}

export const serviceById = async (id: string) : Promise<ServiceResponseDto> => {
    const service = await prisma.service.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            active: true,
            price: true,
            category: {
                select: {
                    name: true
                }
            }
        }
    })

    if (!service) {
        throw new NotFoundError(`Service with ID ${id} not found`)
    }
    return service
}

export const storeService = async (data: ServiceRequestDto) : Promise<void> => {
    const { name, price, categoryId, active } = data

    if (!name || typeof name !== 'string') {
        throw new ValidationError('El campo nombre es obligatorio y debe ser una cadena de texto.')
    }

    if (!price || typeof price !== 'number') {
        throw new ValidationError('El campo precio es obligatorio y debe ser un valor numérico.')
    }

    if (!categoryId) {
        throw new ValidationError('El campo categoría es obligatorio.')
    }

    const exists = await prisma.service.findUnique({
        where: {
            id: categoryId
        }
    })

    if (!exists) {
        throw new NotFoundError(`La categoría no existe`)
    }

    await prisma.service.create({
        data: {
            name,
            active: active ?? true,
            price,
            categoryId
        }
    })
}

export const updateDataService = async (id: string, data: ServiceRequestDto) : Promise<void> => {
    const { name, price, categoryId, active } = data

    if (!name || typeof name !== 'string') {
        throw new ValidationError('El campo nombre es obligatorio y debe ser una cadena de texto.')
    }

    if (!price || typeof price !== 'number') {
        throw new ValidationError('El campo precio es obligatorio y debe ser un valor numérico.')
    }

    if (!categoryId) {
        throw new ValidationError('El campo categoría es obligatorio.')
    }

    const exists = await prisma.category.findUnique({
        where: {
            id: categoryId
        }
    })

    if (!exists) {
        throw new NotFoundError(`La categoría no existe`)
    }

    await serviceById(id)

    await prisma.service.update({
        where: { id },
        data: {
            name,
            active: active ?? true,
            price,
            categoryId
        }
    })
}

export const deleteDataService = async (id: string) : Promise<void> => {
    await serviceById(id)
    await prisma.service.update({
        where: { id },
        data: {
            active: false
        }
    })
}