import { Router } from "express";
import { UserController } from "./controllers/UserControllers";
import { RecordController } from "./controllers/RecordControllers";
import { authMiddleware } from "./middleware/authMiddleware";


const routes = Router()

//Usuários
routes.post('/user', new UserController().create)
//Login
routes.post('/login', new UserController().login)

//rotas autenticada
routes.get('/profile', authMiddleware, new UserController().getProfile)


//Todos os Registros
routes.get('/records',  new RecordController().listRecors)
//Criar Registro
routes.post('/record/create', authMiddleware, new RecordController().create)
//Buscar Registros por usuario
routes.get('/recordsUser', authMiddleware, new RecordController().listRecordsUser)
//Soma Registros
routes.get('/sumRecords', authMiddleware, new RecordController().sumRecordsUser)

routes.put('/updateRecord', authMiddleware, new RecordController().updateRecord)



export default routes