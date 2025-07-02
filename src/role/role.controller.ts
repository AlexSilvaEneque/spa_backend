import { Request, Response } from 'express'
import { deleteDataRole, getRoles, roleById, storeRole, updateDataRoles} from './role.service'
import { RoleRequestDto } from './role.dto'

export const getAllRoles = async (req: Request, res: Response) => {
    const roles = await getRoles()
    res.status(200).json({
        success: true,
        roles
    })
}

export const getRoleById = async (req: Request, res: Response) => {
    const { id } = req.params
    if (id) {
        const role = await roleById(id)
        res.status(200).json({
            success: true,
            role
        })
        return
    }
    res.status(400).json({
        success: false,
        message: 'Parámetro ID es obligatorio'
    })
}

export const saveRole = async (req: Request, res: Response) => {
    const data: RoleRequestDto = req.body
    await storeRole(data)
    res.status(201).json({
        success: true,
        message: 'Rol creado correctamente.'
    })
}

export const updateRole = async (req: Request, res: Response) => {
    const { id } = req.params
    if (id) {
        const data: RoleRequestDto = req.body
        await updateDataRoles(id, data)
        res.status(201).json({
            success: true,
            message: 'Rol actualizado correctamente.'
        })
        return
    }
    res.status(400).json({
        success: false,
        message: 'Parámetro ID es obligatorio.'
    })
}

export const deleteRole = async (req: Request, res: Response) => {
    const { id } = req.params

    if (id) {
        await deleteDataRole(id)
        res.status(200).json({
            success: true,
            message: 'Rol eliminado correctamente.'
        })
        return
    }

    res.status(400).json({
        success: false,
        message: 'Parámetro ID es obligatorio.'
    })
}