import { Router } from 'express'
import { deleteRole, getAllRoles, getRoleById, saveRole, updateRole } from './role.controller'

const roleRouter = Router()

roleRouter.get('/', getAllRoles)
roleRouter.get('/:id', getRoleById)
roleRouter.post('/', saveRole)
roleRouter.put('/:id', updateRole)
roleRouter.patch('/:id', deleteRole)

export default roleRouter