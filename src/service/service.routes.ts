import { Router } from "express"
import { deleteService, getAllServices, getServiceById, saveService, updateService } from "./service.controller"

const serviceRouter = Router()

serviceRouter.get('/', getAllServices)
serviceRouter.get('/:id', getServiceById)
serviceRouter.post('/', saveService)
serviceRouter.put('/:id', updateService)
serviceRouter.patch('/:id', deleteService)

export default serviceRouter