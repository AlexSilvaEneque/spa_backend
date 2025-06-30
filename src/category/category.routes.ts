import { Router } from 'express'
import { deleteCategory, getCategories, getCategoryById, saveCategory, updateCategory } from './category.controller'

const categoryRouter = Router()

categoryRouter.get('/', getCategories)
categoryRouter.get('/:id', getCategoryById)
categoryRouter.post('/', saveCategory)
categoryRouter.put('/:id', updateCategory)
categoryRouter.patch('/:id', deleteCategory)

export default categoryRouter