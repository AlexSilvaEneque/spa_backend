import { Request, Response } from 'express'
import { allCategories, categoryById, deleteDataCategory, storeCategory, updateDataCategory } from './category.service'
import { CategoryRequestDto } from './category.dto'

export const getCategories = async (req: Request, res: Response) => {
    const categories = await allCategories()
    res.status(200).json({
        success: true,
        categories
    })
}

export const getCategoryById = async (req: Request, res: Response) => {
    const { id } = req.params
    if (id) {
        const cateogry = await categoryById(id)
        res.status(200).json({
            success: true,
            category: cateogry
        })
        return
    }
    res.status(400).json({
        success: false,
        message: 'Category ID is required'
    })
}

export const saveCategory = async (req : Request, res : Response) => {
    const data: CategoryRequestDto = req.body
    await storeCategory(data)
    res.status(201).json({
        success: true,
        message: 'Categoría creada correctamente.'
    })
}

export const updateCategory = async (req: Request, res: Response) => {
    const { id } = req.params
    const data: CategoryRequestDto = req.body

    if (id) {
        await updateDataCategory(id, data)
        res.status(201).json({
            success: true,
            message: 'Categoría actualizada correctamente.'
        })
        return
    }

    res.status(400).json({
        success: false,
        message: 'Parámetro ID es obligatorio.'
    })
}

export const deleteCategory = async (req: Request, res: Response) => {
    const { id } = req.params

    if (id) {
        await deleteDataCategory(id)
        res.status(200).json({
            success: true,
            message: 'Categoría eliminada correctamente.'
        })
        return
    }

    res.status(400).json({
        success: false,
        message: 'Parámetro ID es obligatorio.'
    })
}