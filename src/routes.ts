import { Router } from "express";
import { UserController } from "./controllers/UserControllers";
import { RecordController } from "./controllers/RecordControllers";


const routes = Router()

routes.post('/user', new UserController().create)
routes.post('/record', new RecordController().create)

export default routes