import { Request, Response } from "express"
import { allServices, deleteDataService, serviceById, storeService, updateDataService } from "./service.service"
import { ServiceRequestDto } from "./service.dto"

export const getAllServices = async(req: Request, res: Response) => {
    const services = await allServices()
    res.status(200).json({
        success: true,
        services
    })
}

export const getServiceById = async(req: Request, res: Response) => {
    const { id } = req.params

    if (id) {
        const service = await serviceById(id)
        res.status(200).json({
            success: true,
            service
        })
        return
    }
    res.status(400).json({
        success: false,
        message: 'Service ID is required'
    })
}

export const saveService = async(req: Request, res: Response) => {
    const data : ServiceRequestDto = req.body
    await storeService(data)
    res.status(201).json({
        success: true,
        message: 'Servicio creado correctamente.'
    })
}

export const updateService = async(req: Request, res: Response) => {
    const { id } = req.params
    const data : ServiceRequestDto = req.body

    if (id) {
        await updateDataService(id, data)
        res.status(201).json({
            success: true,
            message: 'Servicio actualizado correctamente.'
        })
        return
    }

    res.status(400).json({
        success: false,
        message: 'Parámetro ID es obligatorio.'
    })
}

export const deleteService = async(req: Request, res: Response) => {
    const { id } = req.params

    if (id) {
        await deleteDataService(id)
        res.status(200).json({
            success: true,
            message: 'Servicio eliminado correctamente.'
        })
        return
    }
    res.status(400).json({
        success: false,
        message: 'Parámetro ID es obligatorio.'
    })
}